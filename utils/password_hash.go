package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(pass string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(pass), 14)
	return string(bytes), err
}

func VerifyPassword(hashPass []byte, pass []byte) error {
	if err := bcrypt.CompareHashAndPassword(hashPass, pass); err != nil {
		return err
	}

	return nil
}
