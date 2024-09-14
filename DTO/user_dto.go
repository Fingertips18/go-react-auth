package dto

import "github.com/Fingertips18/go-auth/models"

type UserDTO struct {
	Message string      `json:"message"`
	User    models.User `json:"user"`
}
