package utils

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(id string, username string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    id,
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
		Audience:  jwt.ClaimStrings{"http://localhost:5000"},
	})

	SECRET_KEY := os.Getenv("SECRET_KEY")
	token, err := claims.SignedString([]byte(SECRET_KEY))

	if err != nil {
		return "", err
	}

	return token, nil
}

func SetCookieToken(c fiber.Ctx, token string) {
	ENV := os.Getenv("ENV")

	if ENV == "" {
		log.Fatal("ENV must be set")
	}

	cookie := fiber.Cookie{
		Name:     "token",
		Value:    token,
		HTTPOnly: true,
		Secure:   ENV == "production",
		SameSite: "strict",
		Expires:  time.Now().Add(time.Hour * 24 * 7),
	}

	c.Cookie(&cookie)
}

func ClearCookieToken(c fiber.Ctx) {
	ENV := os.Getenv("ENV")

	if ENV == "" {
		log.Fatal("ENV must be set")
	}

	cookie := fiber.Cookie{
		Name:     "token",
		Value:    "",
		HTTPOnly: true,
		Secure:   ENV == "production",
		SameSite: "strict",
		Expires:  time.Now().Add(-time.Hour),
	}

	c.Cookie(&cookie)
}
