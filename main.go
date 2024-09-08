package main

import (
	"log"
	"os"

	"github.com/Fingertips18/go-auth/configs"
	"github.com/Fingertips18/go-auth/database"
	"github.com/Fingertips18/go-auth/routes"
	"github.com/gofiber/fiber/v3"
)

func main() {
	// Initialize environment variables
	configs.LoadEnv()

	// Connect to supabase
	if err := database.ConnectDB(); err != nil {
		log.Fatal("Failed to connect to database")
	}

	app := fiber.New()

	// Register routes
	routes.UseAuthRoute(app)

	PORT := os.Getenv("PORT")
	log.Fatal(app.Listen(":" + PORT))
}
