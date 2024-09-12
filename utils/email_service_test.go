package utils

import (
	"os"
	"testing"

	"github.com/Fingertips18/go-auth/configs"
)

func TestEmailService(t *testing.T) {
	toEmail := os.Getenv("TEST_EMAIL")
	const username = "Test"

	configs.ConfigureEmail()

	t.Run("SendWelcomeEmail_Test", func(t *testing.T) {
		if err := SendWelcomeEmail(toEmail, username); err != nil {
			t.Errorf("Ërror sending welcome email: %v", err)
		} else {
			t.Log("welcome email sent")
		}
	})

	t.Run("SendEmailVerification_Test", func(t *testing.T) {
		if err := SendEmailVerification(toEmail, username, "1234"); err != nil {
			t.Errorf("Ërror sending email verification: %v", err)
		} else {
			t.Log("Verification email sent")
		}
	})

	t.Run("SendEmailRequestResetPassword_Test", func(t *testing.T) {
		if err := SendEmailRequestResetPassword(toEmail, "reset-token"); err != nil {
			t.Errorf("Ërror sending reset password request : %v", err)
		} else {
			t.Log("Successful reset password request email sent")
		}
	})

	t.Run("SendEmailResetPasswordSuccess_Test", func(t *testing.T) {
		if err := SendEmailResetPasswordSuccess(toEmail, username); err != nil {
			t.Errorf("Ërror sending reset password success : %v", err)
		} else {
			t.Log("Reset password successful email sent")
		}
	})

	t.Run("SendWelcomeEmail_Test", func(t *testing.T) {
		if err := SendWelcomeEmail(toEmail, username); err != nil {
			t.Errorf("Ërror sending welcome email: %v", err)
		} else {
			t.Log("welcome email sent")
		}

	})
}
