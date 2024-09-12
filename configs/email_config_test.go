package configs

import (
	"bytes"
	"log"
	"testing"
)

func TestConfigureEmail(t *testing.T) {
	t.Run("ConfigureEmail_Success", func(t *testing.T) {
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
