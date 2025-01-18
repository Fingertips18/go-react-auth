package configs

import (
	"errors"
	"net/smtp"
	"os"
)

var (
	SMTPAuth smtp.Auth
	Email    string
)

const SMTPADDRESS = "smtp.gmail.com:587"

func ConfigureEmail() error {
	EMAIL := os.Getenv("EMAIL")
	PASSWORD := os.Getenv("EMAIL_APP_PASSWORD")

	if EMAIL == "" || PASSWORD == "" {
		return errors.New("EMAIL or EMAIL_APP_PASSWORD must be set")
	}

	SMTPAuth = smtp.PlainAuth("", EMAIL, PASSWORD, "smtp.gmail.com")
	Email = EMAIL
	return nil
}
