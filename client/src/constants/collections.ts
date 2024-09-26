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
    tooltip: "Must be between 3 and 20 characters.",
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
    tooltip: "Valid email address includes an '@' symbol and a domain name.",
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
      "At least 8 characters. Include a mix of uppercase & lowercase letters, numbers, and special characters.",
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
      "Re-enter your password to confirm. Ensure both passwords are identical.",
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
    tooltip: "Valid email address includes an '@' symbol and a domain name.",
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
      "At least 8 characters. Include a mix of uppercase & lowercase letters, numbers, and special characters.",
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
    name: "old-password",
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
    name: "new-password",
    label: "New Password",
    tooltip:
      "At least 8 characters. Include a mix of uppercase & lowercase letters, numbers, and special characters.",
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
      "Re-enter your password to confirm. Ensure both passwords are identical.",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidateConfirmPassword,
    maxLength: 128,
  },
];
