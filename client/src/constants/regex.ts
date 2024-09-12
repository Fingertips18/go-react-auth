const EmailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const UpperCaseRegex = /[A-Z]/;
const LowerCaseRegex = /[a-z]/;
const NumberRegex = /\d/;
const SpecialRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

export {
  EmailRegex,
  UpperCaseRegex,
  LowerCaseRegex,
  NumberRegex,
  SpecialRegex,
};
