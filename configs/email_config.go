package configs

import (
	"log"
	"net/smtp"
	"os"
)

var SMTPAUTH smtp.Auth

const SMTPADDRESS = "smtp.gmail.com:587"

var EMAIL string

func ConfigureEmail() {
	EMAIL := os.Getenv("EMAIL")
	PASSWORD := os.Getenv("EMAIL_APP_PASSWORD")
	if EMAIL == "" || PASSWORD == "" {
		log.Fatal("EMAIL or EMAIL_APP_PASSWORD must be set")
	}

	SMTPAUTH = smtp.PlainAuth("", EMAIL, PASSWORD, "smtp.gmail.com")
}
