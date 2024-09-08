package controllers

import "github.com/gofiber/fiber/v3"

func Hello(c fiber.Ctx) error {
	return c.SendString("Hello world👋!")
}
