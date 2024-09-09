package controllers

import (
	"github.com/Fingertips18/go-auth/database"
	"github.com/Fingertips18/go-auth/models"
	"github.com/Fingertips18/go-auth/utils"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SignUp(c fiber.Ctx) error {
	user := models.User{}
	if err := c.Bind().JSON(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	password, err := utils.HashPassword(user.Password)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	user.Password = password

	res := database.DB.Create(&user)
	if res.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Unable to create user"})
	}

	user.Password = ""
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User created successfully", "user": user})
}

func SignIn(c fiber.Ctx) error {
	var data map[string]string
	if err := c.Bind().JSON(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	var user models.User
	res := database.DB.Raw(`SELECT * FROM "users" WHERE "emailAddress" = ?`, data["email"]).Scan(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": res.Error.Error()})
	}

	if err := utils.VerifyPassword([]byte(user.Password), []byte(data["password"])); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	token, err := utils.GenerateToken(user.ID.String(), user.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	utils.SetCookieToken(c, token)

	user.Password = ""
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Sign in successful", "user": user})
}

func SignOut(c fiber.Ctx) error {
	utils.ClearCookieToken(c)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Sign out successful"})
}
