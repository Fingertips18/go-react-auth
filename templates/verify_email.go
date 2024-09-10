package templates

import (
	"fmt"

	"github.com/Fingertips18/go-auth/constants"
)

const _VERIFIY_EMAIL_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: %s; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, %s, %s); padding: 20px; text-align: center;">
    <h1 style="color: #DCF9F5; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: %s; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {username},</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: %s;">{code}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Fingertips</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`

var VERIFY_EMAIL_TEMPLATE = fmt.Sprintf(_VERIFIY_EMAIL_HTML, constants.FOREGROUND, constants.PRIMARY, constants.ACCENT, constants.BACKGROUND, constants.PRIMARY)
