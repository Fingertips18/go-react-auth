package routes

import (
	"fmt"

	"github.com/Fingertips18/go-auth/constants"
	"github.com/Fingertips18/go-auth/controllers"
	"github.com/gofiber/fiber/v3"
)

func UseAuthRoute(app *fiber.App) {
	app.Post(fmt.Sprintf("%s%s", constants.AUTH, constants.SIGNUP), controllers.SignUp)
	app.Post(fmt.Sprintf("%s%s", constants.AUTH, constants.SIGNIN), controllers.SignIn)
	app.Post(fmt.Sprintf("%s%s", constants.AUTH, constants.SIGNOUT), controllers.SignOut)
	app.Get(fmt.Sprintf("%s%s", constants.AUTH, constants.VERIFY), controllers.Verify)
	app.Post(fmt.Sprintf("%s%s", constants.AUTH, constants.FORGOTPASSWORD), controllers.ForgotPassword)
	app.Post(fmt.Sprintf("%s%s/:token", constants.AUTH, constants.RESETPASSWORD), controllers.ResetPassword)
}
