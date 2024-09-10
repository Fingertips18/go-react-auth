package controllers

import (
	"time"

	"github.com/Fingertips18/go-auth/database"
	"github.com/Fingertips18/go-auth/models"
	"github.com/Fingertips18/go-auth/utils"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SignUp(c fiber.Ctx) error {
	var data struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.Bind().JSON(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	user := models.User{
		Username: data.Username,
		Email:    data.Email,
		Password: data.Password,
	}

	password, err := utils.HashPassword(user.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	user.Password = password

	res := database.Instance.Create(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to create user"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User created successfully", "user": user})
}

func SignIn(c fiber.Ctx) error {
	var data struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.Bind().JSON(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Either email or/and password is/are empty"})
	}

	var user models.User
	res := database.Instance.Where("email_address = ?", data.Email).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": res.Error.Error()})
	}

	if err := utils.VerifyPassword([]byte(user.Password), []byte(data.Password)); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	token, err := utils.GenerateJWTToken(user.ID.String(), user.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	utils.SetCookieToken(c, token)

	user.LastSignedIn = time.Now()
	res = database.Instance.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to save sign in credentials"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Sign in successful", "user": user})
}

func SignOut(c fiber.Ctx) error {
	utils.ClearCookieToken(c)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Sign out successful"})
}

func Verify(c fiber.Ctx) error {
	claims, err := utils.ParseCookieToken(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	var user models.User

	res := database.Instance.Where("id = ?", claims.Issuer).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": res.Error.Error()})
	}

	user.Password = ""
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Session valid", "user": user})
}

func ForgotPassword(c fiber.Ctx) error {
	var data struct {
		Email string `json:"email"`
	}
	if err := c.Bind().JSON(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Either email is invalid or empty"})
	}

	var user models.User
	res := database.Instance.Where("email_address = ?", data.Email).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": res.Error.Error()})
	}

	resetPasswordToken, err := utils.GenerateResetToken()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}
	resetPasswordTokenExp := time.Now().Add(time.Minute * 15)

	user.ResetPasswordToken = *resetPasswordToken
	user.ResetPasswordTokenExpiration = resetPasswordTokenExp

	res = database.Instance.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to save forgot password credentials"})
	}

	if err := utils.SendEmailRequestResetPassword(user.Email, *resetPasswordToken); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Password reset request link has been sent to your email"})
}

func ResetPassword(c fiber.Ctx) error {
	var data struct {
		Password string `json:"password"`
	}
	if err := c.Bind().JSON(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Either password is invalid or empty"})
	}

	id := c.Params("token")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing token"})
	}

	var user models.User

	res := database.Instance.Where("reset_password_token = ?", id).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": res.Error.Error()})
	}

	password, err := utils.HashPassword(data.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	user.Password = password
	user.ResetPasswordToken = ""
	user.ResetPasswordToken = ""

	res = database.Instance.Save(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to save reset password credentials"})
	}

	if err := utils.SendEmailResetPasswordSuccess(user.Email, user.Username); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Password reset success link has been sent to your email"})
}
