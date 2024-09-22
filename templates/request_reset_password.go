package templates

import (
	"fmt"

	"github.com/Fingertips18/go-auth/constants"
)

const _REQUEST_RESET_PASSWORD_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: %s; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, %s, %s); padding: 20px; text-align: center;">
    <h1 style="color: #DCF9F5 !important; margin: 0;">Password Request Reset</h1>
  </div>
  <div style="background-color: %s; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: %s; color: #DCF9F5 !important; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 15 minutes for security reasons.</p>
    <p>Best regards,<br>Fingertips</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`

var RESET_PASSWORD_REQUEST_TEMPLATE = fmt.Sprintf(_REQUEST_RESET_PASSWORD_HTML, constants.FOREGROUND, constants.PRIMARY, constants.ACCENT, constants.BACKGROUND, constants.PRIMARY)
