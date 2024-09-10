package configs

import (
	"log"
	"net/smtp"
	"os"
)

var (
	SMTPAuth smtp.Auth
	Email    string
)

const SMTPADDRESS = "smtp.gmail.com:587"

func ConfigureEmail() {
	EMAIL := os.Getenv("EMAIL")
	PASSWORD := os.Getenv("EMAIL_APP_PASSWORD")
	if EMAIL == "" || PASSWORD == "" {
		log.Fatal("EMAIL or EMAIL_APP_PASSWORD must be set")
	}

	SMTPAuth = smtp.PlainAuth("", EMAIL, PASSWORD, "smtp.gmail.com")
}
