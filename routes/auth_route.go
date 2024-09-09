package routes

import (
	"github.com/Fingertips18/go-auth/constants"
	"github.com/Fingertips18/go-auth/controllers"
	"github.com/gofiber/fiber/v3"
)

func UseAuthRoute(app *fiber.App) {
	app.Post(constants.SIGNUP, controllers.SignUp)
	app.Post(constants.SIGNIN, controllers.SignIn)
	app.Post(constants.SIGNOUT, controllers.SignOut)
	app.Get(constants.VERIFY, controllers.Verify)
}
