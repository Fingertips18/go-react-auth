package models

import "time"

type User struct {
	Base
	Username                     string    `json:"username" gorm:"not null"`
	Email                        string    `json:"email_address" gorm:"column:email_address;unique;not null"`
	Password                     string    `json:"-" gorm:"not null"`
	LastSignedIn                 time.Time `json:"last_signed_in" gorm:"column:last_signed_in;default:now()"`
	IsVerified                   bool      `json:"is_verified" gorm:"column:is_verified;default:false"`
	ResetPasswordToken           string    `json:"reset_password_token" gorm:"column:reset_password_token"`
	ResetPasswordTokenExpiration time.Time `json:"reset_password_token_exp" gorm:"column:reset_password_token_exp"`
}
