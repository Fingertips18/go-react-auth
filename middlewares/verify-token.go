package middlewares

import (
	"log"
	"os"
	"time"

	dto "github.com/Fingertips18/go-auth/DTO"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
)

func VerifyToken(c fiber.Ctx) error {
	tokenString := c.Cookies("token")

	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(dto.ErrorDTO{Error: "No token found"})
	}

	SECRET_KEY := os.Getenv("SECRET_KEY")
	if SECRET_KEY == "" {
		log.Fatal("SECRET_KEY must be set")
	}

	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SECRET_KEY), nil
	})

	if err != nil {
		return err
	}

	claims, ok := token.Claims.(*jwt.RegisteredClaims)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(dto.ErrorDTO{Error: "Invalid token claims"})
	}

	if time.Now().After(claims.ExpiresAt.Time) {
		return c.Status(fiber.StatusUnauthorized).JSON(dto.ErrorDTO{Error: "Invalid or expired token"})
	}

	c.Locals("id", claims.Issuer)

	return c.Next()
}
