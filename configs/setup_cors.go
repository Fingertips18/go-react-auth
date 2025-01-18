package configs

import (
	"errors"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func SetupCORS(app *fiber.App) error {
	CLIENT_URL := os.Getenv("CLIENT_URL")
	if CLIENT_URL == "" {
		return errors.New("CLIENT_URL must be set")
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{CLIENT_URL},
		AllowCredentials: true,
	}))

	return nil
}
