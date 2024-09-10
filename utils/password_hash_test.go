package utils

import "testing"

func TestHashPassword(t *testing.T) {
	password := "secret"

	hashPass, err := HashPassword(password)
	if err != nil {
		t.Fatalf("Error hashing password: %v", err)
	}

	if len(hashPass) == 0 || !_isValidBcryptHash(hashPass) {
		t.Errorf("Hashed password is not a valid bcrypt hash: %s", hashPass)
	}

	hashPass2, err := HashPassword(password)
	if err != nil {
		t.Fatalf("Error hashing 2nd password: %v", err)
	}

	if hashPass == hashPass2 {
		t.Errorf("Hashing the same password produces the same hash: %s", hashPass)
	}
}

func TestVerifyPassword(t *testing.T) {
	password := "secret"

	hashPass, err := HashPassword(password)
	if err != nil {
		t.Fatalf("Error hashing password: %v", err)
	}

	if err := VerifyPassword([]byte(hashPass), []byte(password)); err != nil {
		t.Errorf("Hash does not match password: %v", err)
	}
}

func _isValidBcryptHash(hash string) bool {
	if len(hash) < 60 {
		return false
	}
	return hash[:4] == "$2a$" || hash[:4] == "$2b$" || hash[:4] == "$2y$"
}
