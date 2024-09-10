package database

import (
	"log"
	"os"

	"github.com/Fingertips18/go-auth/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Instance *gorm.DB

func ConnectDB() {
	URI := os.Getenv("SUPABASE_URI")
	if URI == "" {
		log.Fatal("SUPABASE_URI must be set")
	}

	conn, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  URI,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	if os.Getenv("RUN_MIGRATIONS") == "true" {
		log.Println("Running migration...")
		err = conn.AutoMigrate(&models.User{})
		if err != nil {
			log.Fatalf("Error running migrations: %v", err)
		}
	}

	Instance = conn

	if Instance == nil {
		log.Fatalf("Error: %v", gorm.ErrInvalidDB)
	}

}
