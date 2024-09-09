package configs

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func SetupCORS(app *fiber.App) {
	CLIENT_URL := os.Getenv("CLIENT_URL")
	if CLIENT_URL == "" {
		log.Fatal("CLIENT_URL must be set")
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{CLIENT_URL},
		AllowCredentials: true,
	}))
}
