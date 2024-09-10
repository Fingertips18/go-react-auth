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

	// Configure smtp email
	configs.ConfigureEmail()

	// Connect to supabase
	database.ConnectDB()

	app := fiber.New()

	// Setup CORS
	configs.SetupCORS(app)

	// Register routes
	routes.UseAuthRoute(app)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}
	log.Fatal(app.Listen(":" + PORT))
}
