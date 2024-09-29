import { describe, it, expect, test } from "vitest";

import {
  ValidateConfirmPassword,
  ValidateEmail,
  ValidatePassword,
  ValidateUsername,
} from "./validations";

describe("ValidateUsername", () => {
  it("should be valid since length is between 3 to 20 characters", () => {
    const username = "Test User";
    const isValid = ValidateUsername(username);
    expect(isValid).toBeTruthy();
  });

  test("must be invalid since length is less than 3 characters", () => {
    const username = "abc";
    const isInvalid = ValidateUsername(username);
    expect(isInvalid).toBeFalsy();
  });

  test("must be invalid since length is greater than 20 characters", () => {
    const username = "abcdefghijklmnopqrstuvwxyzABCDEFGH";
    const isInvalid = ValidateUsername(username);
    expect(isInvalid).toBeFalsy();
  });
});

describe("ValidateEmail", () => {
  const validEmail = "test@example.com";
  const invalidEmail = "abc123,./blabla";

  const missingAt = "john.doeexample.com";
  const missingDomain = "john.doe@";
  const invalidTLD = "john.doe@example.c";
  const withSpace = "john doe@example.com";
  const withSpecial = "john.doe!@example.com";

  test(`${validEmail} is valid`, () => {
    const isValid = ValidateEmail(validEmail);
    expect(isValid).toBeTruthy();
  });

  test(`${invalidEmail} is invalid`, () => {
    const isInvalid = ValidateEmail(invalidEmail);
    expect(isInvalid).toBeFalsy();
  });

  test(`${missingAt} is invalid`, () => {
    const isInvalid = ValidateEmail(missingAt);
    expect(isInvalid).toBeFalsy();
  });

  test(`${missingDomain} is invalid`, () => {
    const isInvalid = ValidateEmail(missingDomain);
    expect(isInvalid).toBeFalsy();
  });

  test(`${invalidTLD} is invalid`, () => {
    const isInvalid = ValidateEmail(invalidTLD);
    expect(isInvalid).toBeFalsy();
  });

  test(`${withSpace} is invalid`, () => {
    const isInvalid = ValidateEmail(withSpace);
    expect(isInvalid).toBeFalsy();
  });

  test(`${withSpecial} is invalid`, () => {
    const isInvalid = ValidateEmail(withSpecial);
    expect(isInvalid).toBeFalsy();
  });
});

describe("ValidatePassword", () => {
  const strongPass = "9Gf!v@7xR3#u$Pq4";
  const weakPass = "abc123";

  const lowecaseOnly = "abc";
  const uppercaseOnly = "ABC";
  const digitOnly = "123";
  const specialOnly = "!@#$$%^&*()_+";
  const lessThan6 = "Abc_1";

  test(`${strongPass} is valid`, () => {
    const isValid = ValidatePassword(strongPass);
    expect(isValid).toBeTruthy();
  });

  test(`${weakPass} is invalid`, () => {
    const isInvalid = ValidatePassword(weakPass);
    expect(isInvalid).toBeFalsy();
  });

  test(`${lowecaseOnly} is invalid`, () => {
    const isInvalid = ValidatePassword(lowecaseOnly);
    expect(isInvalid).toBeFalsy();
  });

  test(`${uppercaseOnly} is invalid`, () => {
    const isInvalid = ValidatePassword(uppercaseOnly);
    expect(isInvalid).toBeFalsy();
  });

  test(`${digitOnly} is invalid`, () => {
    const isInvalid = ValidatePassword(digitOnly);
    expect(isInvalid).toBeFalsy();
  });

  test(`${specialOnly} is invalid`, () => {
    const isInvalid = ValidatePassword(specialOnly);
    expect(isInvalid).toBeFalsy();
  });

  test(`${lessThan6} is invalid`, () => {
    const isInvalid = ValidatePassword(lessThan6);
    expect(isInvalid).toBeFalsy();
  });
});

describe("ValidateConfirmPassword", () => {
  const password = "9Gf!v@7xR3#u$Pq4";
  const otherPassword = "9Gf@2asd1s!Pq4";

  test(`${password} and ${password} are the same`, () => {
    const isValid = ValidateConfirmPassword({
      pass1: password,
      pass2: password,
    });
    expect(isValid).toBeTruthy();
  });

  test(`${password} and ${otherPassword} are NOT the same`, () => {
    const isInvalid = ValidateConfirmPassword({
      pass1: password,
      pass2: otherPassword,
    });
    expect(isInvalid).toBeFalsy();
  });
});
