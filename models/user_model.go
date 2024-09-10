package models

import "time"

type User struct {
	Base
	Username                     string     `json:"username" gorm:"not null"`
	Email                        string     `json:"email_address" gorm:"column:email_address;unique;not null"`
	Password                     string     `json:"-" gorm:"not null"`
	LastSignedIn                 time.Time  `json:"last_signed_in" gorm:"column:last_signed_in;default:now()"`
	IsVerified                   bool       `json:"is_verified" gorm:"column:is_verified;default:false"`
	VerificationToken            *string    `json:"verification_token,omitempty" gorm:"column:verification_token"`
	VerificationTokenExpiration  *time.Time `json:"verification_token_exp,omitempty" gorm:"column:verification_token_exp"`
	ResetPasswordToken           *string    `json:"reset_password_token,omitempty" gorm:"column:reset_password_token"`
	ResetPasswordTokenExpiration *time.Time `json:"reset_password_token_exp,omitempty" gorm:"column:reset_password_token_exp"`
}
