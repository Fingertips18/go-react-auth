import {
  EmailRegex,
  LowerCaseRegex,
  NumberRegex,
  SpecialRegex,
  UpperCaseRegex,
} from "@/constants/regex";

export const ValidateUsername = (username: string) =>
  username.length > 3 && username.length <= 20;

export const ValidateEmail = (email: string) => EmailRegex.test(email);

export const ValidatePassword = (password: string) => {
  const criteria = [
    password.length >= 6,
    UpperCaseRegex.test(password),
    LowerCaseRegex.test(password),
    NumberRegex.test(password),
    SpecialRegex.test(password),
  ];

  return criteria.every((criterion) => criterion);
};

export const ValidateConfirmPassword = ({
  pass1,
  pass2,
}: {
  pass1: string;
  pass2: string;
}) => {
  if (pass1 !== pass2) return false;

  return true;
};
