import { Lock, Mail, User } from "lucide-react";

import {
  ValidateConfirmPassword,
  ValidateEmail,
  ValidatePassword,
  ValidateUsername,
} from "@/lib/utils/validations";

export const SIGNUP_INPUTS = [
  {
    name: "username",
    label: "Username",
    tooltip: "Choose a username between 3 and 20 characters.",
    placeholder: "e.g. john doe",
    type: "text",
    autoComplete: "username",
    suffixIcon: User,
    validation: ValidateUsername,
    maxLength: 20,
  },
  {
    name: "email",
    label: "Email Address",
    tooltip:
      "Please enter a valid email address. Ensure it includes an '@' symbol and a domain name.",
    placeholder: "e.g. john@domain.com",
    type: "email",
    autoComplete: "email",
    suffixIcon: Mail,
    validation: ValidateEmail,
    maxLength: 320,
  },
  {
    name: "password",
    label: "Password",
    tooltip:
      "Create a password with at least 8 characters, including uppercase, lowercase, numbers, and special characters for security.",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidatePassword,
    maxLength: 128,
  },
  {
    label: "Confirm Password",
    tooltip:
      "Re-enter your password to confirm it matches the one you typed above. Ensure both passwords are identical.",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidateConfirmPassword,
    maxLength: 128,
  },
];

export const SIGNIN_INPUTS = [
  {
    name: "email",
    label: "Email Address",
    tooltip:
      "Please enter a valid email address. Ensure it includes an '@' symbol and a domain name.",
    placeholder: "e.g. john@domain.com",
    type: "email",
    autoComplete: "email",
    suffixIcon: Mail,
    validation: ValidateEmail,
    maxLength: 320,
  },
  {
    name: "password",
    label: "Password",
    tooltip:
      "Create a strong password with at least 8 characters. Include a mix of uppercase letters, lowercase letters, numbers, and special characters for better security.",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidatePassword,
    maxLength: 128,
  },
];

export const RESET_PASSWORD_INPUTS = [
  {
    name: "oldPassword",
    label: "Old Password",
    tooltip: "Enter your current password",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidatePassword,
    maxLength: 128,
  },
  {
    name: "newPassword",
    label: "New Password",
    tooltip:
      "Create a password with at least 8 characters, including uppercase, lowercase, numbers, and special characters for security",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidatePassword,
    maxLength: 128,
  },
  {
    label: "Confirm Password",
    tooltip:
      "Re-enter your password to confirm it matches the one you typed above. Ensure both passwords are identical.",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidateConfirmPassword,
    maxLength: 128,
  },
];
