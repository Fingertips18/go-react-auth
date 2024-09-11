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

func SendWelcomeEmail(toEmail string, username string) error {
	const subject = "Welcome Message"
	body := strings.Replace(templates.WELCOME_MESSAGE_TEMPLATE, "{username}", username, 1)
	from := configs.Email
	to := toEmail

	msg := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\nMime-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n%s", from, to, subject, body)

	err := smtp.SendMail(configs.SMTPADDRESS, configs.SMTPAuth, configs.Email, []string{toEmail}, []byte(msg))
	if err != nil {
		return err
	}

	log.Println("welcome email sent")

	return nil
}

func SendEmailVerification(toEmail string, username string, code string) error {
	const subject = "Verify Your Email"
	body := strings.Replace(templates.VERIFY_EMAIL_TEMPLATE, "{username}", username, 1)
	body = strings.Replace(body, "{code}", code, 1)
	from := configs.Email
	to := toEmail

	msg := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\nMime-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n%s", from, to, subject, body)

	err := smtp.SendMail(configs.SMTPADDRESS, configs.SMTPAuth, configs.Email, []string{toEmail}, []byte(msg))
	if err != nil {
		return err
	}

	log.Println("Verification email sent")

	return nil
}

func SendEmailRequestResetPassword(toEmail string, resetToken string) error {
	CLIENT_URL := os.Getenv("CLIENT_URL")
	if CLIENT_URL == "" {
		log.Fatal("CLIENT_URL must be set")
	}

	resetURL := fmt.Sprintf("%s%s/%s", CLIENT_URL, constants.RESETPASSWORD, resetToken)
	const subject = "Reset Password"
	body := strings.Replace(templates.RESET_PASSWORD_REQUEST_TEMPLATE, "{resetURL}", resetURL, 1)
	from := configs.Email
	to := toEmail

	msg := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\nMime-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n%s", from, to, subject, body)

	err := smtp.SendMail(configs.SMTPADDRESS, configs.SMTPAuth, configs.Email, []string{toEmail}, []byte(msg))
	if err != nil {
		return err
	}

	log.Println("Successful reset password request email sent")

	return nil
}

func SendEmailResetPasswordSuccess(toEmail string, username string) error {
	const subject = "Password Reset Successful"
	body := strings.Replace(templates.RESET_PASSWORD_SUCCESS_TEMPLATE, "{username}", username, 1)
	from := configs.Email
	to := toEmail

	msg := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\nMime-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n%s", from, to, subject, body)

	err := smtp.SendMail(configs.SMTPADDRESS, configs.SMTPAuth, configs.Email, []string{toEmail}, []byte(msg))
	if err != nil {
		return err
	}

	log.Println("Reset password successful email sent")

	return nil
}
