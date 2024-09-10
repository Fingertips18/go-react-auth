package configs

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gofiber/fiber/v3"
)

func TestSetupCORS(t *testing.T) {
	envName := "CLIENT_URL"
	testOrigin := "http://example.com"

	os.Setenv(envName, testOrigin)

	app := fiber.New()
	SetupCORS(app)

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Hello world!")
	})

	t.Run("SetupCORS_Valid_Origin", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/", nil)
		req.Header.Set("Origin", testOrigin)
		resp, err := app.Test(req)
		if err != nil {
			t.Fatalf("Error making test request: %v", err)
		}

		corsOrigin := resp.Header.Get("Access-Control-Allow-Origin")
		if corsOrigin != testOrigin {
			t.Errorf("Expected Access-Control-Allow-Origin to be '%s', got '%s'", testOrigin, corsOrigin)
		}
	})

	t.Run("SetupCORS_Invalid_Origin", func(t *testing.T) {
		otherOrigin := "http://test.com"

		req := httptest.NewRequest(http.MethodGet, "/", nil)
		req.Header.Set("Origin", otherOrigin)
		resp, err := app.Test(req)
		if err != nil {
			t.Fatalf("Error making test request: %v", err)
		}

		corsOrigin := resp.Header.Get("Access-Control-Allow-Origin")
		if corsOrigin == testOrigin {
			t.Errorf("Expected Access-Control-Allow-Origin to be not '%s', got '%s'", testOrigin, corsOrigin)
		}
	})
}
