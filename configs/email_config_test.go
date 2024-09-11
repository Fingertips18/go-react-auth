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

	t.Run("ConfigureEmail_Success", func(t *testing.T) {
		os.Setenv(email, "test@example.com")
		os.Setenv(pass, "password")

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
