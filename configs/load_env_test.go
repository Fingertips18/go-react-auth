package configs

import (
	"fmt"
	"os"
	"testing"
)

func TestLoadEnv(t *testing.T) {
	envFile := ".env"
	name := "TEST_VAR"

	t.Run("LoadEnv_Matches", func(t *testing.T) {
		os.Unsetenv(name)

		err := os.WriteFile(envFile, []byte(fmt.Sprintf("%s=hello\n", name)), 0644)
		if err != nil {
			t.Fatalf("Failed to create mock .env file: %v", err)
		}

		err = LoadEnv()

		if err != nil {
			t.Errorf("Expected no error, but got: %v", err)
		}

		if value := os.Getenv(name); value == "hello" {
			t.Logf("Expected %s to be 'hello' and got '%s'", name, value)
		}
	})

	t.Run("LoadEnv_No_Match", func(t *testing.T) {
		os.Unsetenv(name)

		err := os.WriteFile(envFile, []byte(fmt.Sprintf("%s=123\n", name)), 0644)
		if err != nil {
			t.Fatalf("Failed to create mock .env file: %v", err)
		}

		err = LoadEnv()

		if err != nil {
			t.Errorf("Expected no error, but got: %v", err)
		}

		if value := os.Getenv(name); value != "123" {
			t.Errorf("Expected %s to be '123', but got '%s'", name, value)
		}
	})

	t.Run("LoadEnv_File_NotFound", func(t *testing.T) {
		os.Remove(".env")

		err := LoadEnv()

		if err == nil {
			t.Errorf("Expected an error when .env file is missing, but got nil: %v", err)
		}
	})
}
