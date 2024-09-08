package models

type User struct {
	Base
	Username string `json:"username" gorm:"not null"`
	Email    string `json:"email_address" gorm:"column:emailAddress;unique;not null"`
	Password string `json:"password" gorm:"not null"`
}
