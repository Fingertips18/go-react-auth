import { Lock, Mail, User } from "lucide-react";

import {
  ValidateConfirmPassword,
  ValidateEmail,
  ValidatePassword,
  ValidateUsername,
} from "@/lib/utils/validations";

export const SIGNUPINPUTS = [
  {
    name: "username",
    label: "Username",
    placeholder: "e.g. john doe",
    type: "text",
    autoComplete: "username",
    suffixIcon: User,
    validation: ValidateUsername,
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "e.g. john@domain.com",
    type: "email",
    autoComplete: "email",
    suffixIcon: Mail,
    validation: ValidateEmail,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidatePassword,
  },
  {
    label: "Confirm Password",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidateConfirmPassword,
  },
];

export const SIGNININPUTS = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "e.g. john@domain.com",
    type: "email",
    autoComplete: "email",
    suffixIcon: Mail,
    validation: ValidateEmail,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "e.g. m#P52s@ap$V",
    type: "password",
    autoComplete: "new-password",
    suffixIcon: Lock,
    validation: ValidatePassword,
  },
];
