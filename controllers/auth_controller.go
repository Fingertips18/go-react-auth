package controllers

import (
	"github.com/Fingertips18/go-auth/database"
	"github.com/Fingertips18/go-auth/models"
	"github.com/Fingertips18/go-auth/utils"
	"github.com/gofiber/fiber/v3"
)

func SignUp(c fiber.Ctx) error {
	var data map[string]string
	if err := c.Bind().JSON(&data); err != nil {
		return err
	}

	password, err := utils.HashPassword(data["password"])
	if err != nil {
		return err
	}

	user := models.User{
		Username: data["username"],
		Email:    data["email"],
		Password: password,
	}

	res := database.DB.Create(&user)
	if res.Error != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Unable to create user"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "User created successfully", "user": user})
}
