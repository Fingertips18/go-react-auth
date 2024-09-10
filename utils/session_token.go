package utils

import (
	"crypto/rand"
	"encoding/base64"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWTToken(id string, username string) (string, error) {
	CLIENT_URL := os.Getenv("CLIENT_URL")
	if CLIENT_URL == "" {
		log.Fatal("CLIENT_URL must be set")
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    id,
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Subject:   username,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
		Audience:  jwt.ClaimStrings{CLIENT_URL},
	})

	SECRET_KEY := os.Getenv("SECRET_KEY")
	if SECRET_KEY == "" {
		log.Fatal("SECRET_KEY must be set")
	}
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
		SameSite: fiber.CookieSameSiteStrictMode,
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
		SameSite: fiber.CookieSameSiteStrictMode,
		Expires:  time.Now().Add(-(time.Hour * 24)),
		MaxAge:   -1,
	}

	c.Cookie(&cookie)
}

func ParseCookieToken(c fiber.Ctx) (*jwt.RegisteredClaims, error) {
	tokenString := c.Cookies("token")

	SECRET_KEY := os.Getenv("SECRET_KEY")
	if SECRET_KEY == "" {
		log.Fatal("SECRET_KEY must be set")
	}

	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SECRET_KEY), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*jwt.RegisteredClaims)
	if !ok {
		return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid token claims")
	}

	if time.Now().After(claims.ExpiresAt.Time) {
		return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid token")
	}

	return claims, nil
}

func GenerateResetToken() (*string, error) {
	byteToken := make([]byte, 16)
	_, err := rand.Read(byteToken)
	if err != nil {
		return nil, err
	}

	token := base64.URLEncoding.EncodeToString(byteToken)

	return &token, nil
}
