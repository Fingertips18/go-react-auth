package templates

import (
	"fmt"

	"github.com/Fingertips18/go-auth/constants"
)

const _WELCOME_MESSAGE_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Service!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: %s; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, %s, %s); padding: 20px; text-align: center;">
    <h1 style="color: #DCF9F5 !important; margin: 0;">Welcome Aboard!</h1>
  </div>
  <div style="background-color: %s; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {username},</p>
    <p>We're thrilled to have you join our community!</p>
    <p>Here are some tips to get you started:</p>
    <ul>
      <li>Complete your profile</li>
      <li>Explore our features</li>
      <li>Join our community forums</li>
    </ul>
    <p>If you have any questions, feel free to send email at <a href="email@example.com" style="color: %s;">email@example.com</a> to contact our support team.</p>
    <p>Best regards,<br>The Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`

var WELCOME_MESSAGE_TEMPLATE = fmt.Sprintf(_WELCOME_MESSAGE_HTML, constants.FOREGROUND, constants.PRIMARY, constants.ACCENT, constants.BACKGROUND, constants.PRIMARY)
