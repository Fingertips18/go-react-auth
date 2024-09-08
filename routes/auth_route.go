package routes

import (
	"github.com/Fingertips18/go-auth/controllers"
	"github.com/gofiber/fiber/v3"
)

func UseAuthRoute(app *fiber.App) {
	app.Get("/", controllers.Hello)
}
