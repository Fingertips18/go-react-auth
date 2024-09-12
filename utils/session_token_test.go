package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

type JWTHeader struct {
	Alg string `json:"alg"`
	Typ string `json:"typ"`
}

type JWTPayload struct {
	Sub   string `json:"sub"`
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	Exp   int64  `json:"exp"`
}

func TestToken(t *testing.T) {
	// Credentials for jwt headers
	id := "@asd123"
	username := "test"

	envSecretName := "SECRET_KEY"
	secret := os.Getenv(envSecretName)

	t.Run("GenerateJWTToken_Validate", func(t *testing.T) {
		token, err := GenerateJWTToken(id, username)
		if err != nil {
			t.Errorf("Error generating token: %v", err)
		}

		parts := strings.Split(token, ".")
		if len(parts) != 3 {
			t.Errorf("Invalid token: %v", token)
		}

		headerPart := parts[0]
		headerBytes, err := base64.RawURLEncoding.DecodeString(headerPart)
		if err != nil {
			t.Errorf("Error decoding JWT header: %v", err)
		}

		var header JWTHeader
		if err := json.Unmarshal(headerBytes, &header); err != nil {
			t.Errorf("Error unmarshalling JWT header: %v", err)
		} else {
			t.Logf("JWT is signed header: %s", header)
		}

		payloadPart := parts[1]
		payloadBytes, err := base64.RawURLEncoding.DecodeString(payloadPart)
		if err != nil {
			t.Errorf("Error decoding JWT payload: %v", err)
		}

		var payload JWTPayload
		if err := json.Unmarshal(payloadBytes, &payload); err != nil {
			t.Errorf("Error unmarshalling JWT header: %v", err)
		} else {
			t.Logf("JWT payloads: %v", payload)
		}

		exp := time.Unix(payload.Exp, 0)
		if time.Now().After(exp) {
			t.Errorf("Error: Token has expired. Expiration time: %v", exp)
		} else {
			t.Logf("Token is still valid. Expiration time: %v", exp)
		}

		signaturePart := parts[2]
		signatureBytes, err := base64.RawURLEncoding.DecodeString(signaturePart)
		if err != nil {
			t.Errorf("Error decoding JWT signature: %v", err)
		}

		dataToVerify := parts[0] + "." + parts[1]
		h := hmac.New(sha256.New, []byte(secret))
		h.Write([]byte(dataToVerify))
		expectedSignature := h.Sum(nil)

		if hmac.Equal(signatureBytes, expectedSignature) {
			t.Logf("JWT signature is valid: %s", expectedSignature)
		} else {
			t.Log("JWT signature is invalid")
		}
	})

	t.Run("SetCookieToken_Validate", func(t *testing.T) {
		app, token := _HandleCookieToken(t, id, username)

		// Simulate request to check if cookie token was set
		req := httptest.NewRequest(http.MethodGet, "/set-cookie", nil)
		req.AddCookie(&http.Cookie{Name: "token", Value: token})
		resp, err := app.Test(req)
		if err != nil {
			t.Fatalf("Error making set cookie request: %v", err)
		}

		found := false
		for _, cookie := range resp.Cookies() {
			if cookie.Name == "token" {
				found = true
				t.Logf("Cookie 'token' is set with value: %s", cookie.Value)

				if cookie.Value != token {
					t.Errorf("Expected cookie value to be %s but got %s", token, cookie.Value)
				}

				if time.Now().After(cookie.Expires) {
					t.Errorf("Error: Cookie has expired. Expiration time: %v", cookie.Expires)
				} else {
					t.Logf("Cookie is still valid. Expiration time: %v", cookie.Expires)
				}
			}

		}

		if !found {
			t.Error("Cookie 'token' was not set in the response")
		}
	})

	t.Run("ClearCookieToken_Validate", func(t *testing.T) {
		app, token := _HandleCookieToken(t, id, username)

		// Simulate request to check if cookie token was cleared
		req := httptest.NewRequest(http.MethodGet, "/clear-cookie", nil)
		req.AddCookie(&http.Cookie{Name: "token", Value: token})
		resp, err := app.Test(req)
		if err != nil {
			t.Fatalf("Error making clear cookie request: %v", err)
		}

		empty := false
		for _, cookie := range resp.Cookies() {
			if cookie.Name == "token" {
				if cookie.Value == "" {
					empty = true
				}

				if cookie.Value == token {
					t.Errorf("Expected cookie to be empty but got %v", cookie.Value)
				}

				if time.Now().Before(cookie.Expires) {
					t.Errorf("Error: Cookie should expired but got: %v", cookie.Expires)
				}
			}

		}

		if empty {
			t.Log("No cookie was found")
		}
	})

	t.Run("ParseCookieToken_Validate", func(t *testing.T) {
		app, token := _HandleCookieToken(t, id, username)

		// Simulate request to parse cookie token
		req := httptest.NewRequest(http.MethodGet, "/parse-cookie", nil)
		req.AddCookie(&http.Cookie{Name: "token", Value: token})
		resp, err := app.Test(req)
		if err != nil {
			t.Fatalf("Error making parse cookie request: %v", err)
		}

		var body struct {
			Claims *jwt.RegisteredClaims `json:"claims"`
			Error  string                `json:"error"`
		}

		if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
			t.Fatalf("Error decoding response body: %v", err)
		}

		if resp.StatusCode == fiber.StatusUnauthorized {
			t.Fatalf("Error unable to parse cookie token: %v", body.Error)
		}

		if body.Claims.Issuer != id {
			t.Errorf("Expected issuer to be %s but got %s", id, body.Claims.Issuer)
		} else {
			t.Logf("Issuer is %s", body.Claims.Issuer)
		}
	})

	t.Run("GenerateResetToken_Validate", func(t *testing.T) {
		token, err := GenerateResetToken()
		if err != nil {
			t.Errorf("Error generating reset token: %v", err)
		}

		if token == nil {
			t.Fatalf("Expected a token, but got nil: %v", token)
		}

		_, err = base64.URLEncoding.DecodeString(*token)
		if err != nil {
			t.Errorf("Error decoding base64 string: %v", err)
		}

		expectedLength := 24
		if len(*token) != expectedLength {
			t.Errorf("Expected reset token length to be %d, but got %d", expectedLength, len(*token))
		}
	})
}

func _HandleCookieToken(t *testing.T, id string, username string) (*fiber.App, string) {
	t.Helper()

	token, err := GenerateJWTToken(id, username)
	if err != nil {
		t.Errorf("Error generating token: %v", err)
	}

	// Define dummy route to set cookie token
	app := fiber.New()
	app.Get("/set-cookie", func(c fiber.Ctx) error {
		SetCookieToken(c, token)
		return c.SendString("Cookie set!")
	})

	// Define dummy route to clear cookie token
	app.Get("/clear-cookie", func(c fiber.Ctx) error {
		ClearCookieToken(c)
		return c.SendString("Cookies cleared!")
	})

	// Define dummy route to parse cookie token
	app.Get("/parse-cookie", func(c fiber.Ctx) error {
		claims, err := ParseCookieToken(c)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
		}
		return c.JSON(fiber.Map{"claims": claims})
	})

	return app, token
}
