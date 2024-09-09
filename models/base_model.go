package models

import (
	"time"

	"github.com/google/uuid"
)

type Base struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid();unique;not null"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime;not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime;not null"`
}
