package utils

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"strings"

	"github.com/Fingertips18/go-auth/configs"
	"github.com/Fingertips18/go-auth/constants"
	"github.com/Fingertips18/go-auth/templates"
)

func SendEmailResetPassword(toEmail string, resetToken string) error {
	CLIENT_URL := os.Getenv("CLIENT_URL")
	if CLIENT_URL == "" {
		log.Fatal("CLIENT_URL must be set")
	}

	resetURL := fmt.Sprintf("%s%s/%s", CLIENT_URL, constants.RESETPASSWORD, resetToken)
	body := strings.Replace(templates.RESET_PASSWORD_REQUEST_TEMPLATE, "{resetURL}", resetURL, 1)
	const subject = "Reset Password"

	from := configs.EMAIL
	to := toEmail

	msg := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\nMIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n%s", from, to, subject, body)

	err := smtp.SendMail(configs.SMTPADDRESS, configs.SMTPAUTH, configs.EMAIL, []string{toEmail}, []byte(msg))
	if err != nil {
		return err
	}

	log.Println("successful reset password request email sent")

	return nil
}
