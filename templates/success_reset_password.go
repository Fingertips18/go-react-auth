package templates

import (
	"fmt"

	"github.com/Fingertips18/go-auth/constants"
)

const _RESET_PASSWORD_SUCCESS_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: %s; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, %s, %s); padding: 20px; text-align: center;">
    <h1 style="color: #DCF9F5; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: %s; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {username},</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: %s; color: #DCF9F5; width: 50px; height: 50px; line-height: 50px; border-radius: 50%%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Fingertips</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`

var RESET_PASSWORD_SUCCESS_TEMPLATE = fmt.Sprintf(_RESET_PASSWORD_SUCCESS_HTML, constants.FOREGROUND, constants.PRIMARY, constants.ACCENT, constants.BACKGROUND, constants.PRIMARY)
