package configs

import (
	"bytes"
	"log"
	"os"
	"testing"
)

func TestConfigureEmail(t *testing.T) {
	email := "EMAIL"
	pass := "EMAIL_APP_PASSWORD"

	resetEnv := func() {
		os.Unsetenv(email)
		os.Unsetenv(pass)
	}

	t.Run("SMTP_Envs_Found", func(t *testing.T) {
		emailValue := os.Getenv(email)
		passValue := os.Getenv(pass)

		if emailValue != "" {
			t.Logf("%s is set", email)
		}
		if passValue != "" {
			t.Logf("%s is set", pass)
		}
	})

	t.Run("SMTP_Envs_Missing", func(t *testing.T) {
		resetEnv()

		emailValue := os.Getenv(email)
		passValue := os.Getenv(pass)

		if emailValue != "" {
			t.Errorf("Expected %s to be empty but got '%s'", email, emailValue)
		}

		if passValue != "" {
			t.Errorf("Expected %s to be empty but got '%s'", pass, passValue)
		}
	})

	t.Run("ConfigureEmail_Success", func(t *testing.T) {
		resetEnv()
		os.Setenv("EMAIL", "test@example.com")
		os.Setenv("EMAIL_APP_PASSWORD", "password")

		var buf bytes.Buffer
		log.SetOutput(&buf)

		ConfigureEmail()

		if buf.String() != "" {
			t.Errorf("Expected no log output, but got: %s", buf.String())
		}

		if SMTPAuth == nil {
			t.Error("Expected SMTPAuth to be set, but it is nil")
		}
	})
}
