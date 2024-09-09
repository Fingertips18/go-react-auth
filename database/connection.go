package database

import (
	"log"
	"os"

	"github.com/Fingertips18/go-auth/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() error {
	URI := os.Getenv("SUPABASE_URI")
	conn, err := gorm.Open(postgres.Open(URI), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to Supabase: %v", err)
		return err
	}

	if os.Getenv("RUN_MIGRATIONS") == "true" {
		log.Println("Running migration...")
		err = conn.AutoMigrate(&models.User{})
		if err != nil {
			log.Fatalf("Error running migrations: %v", err)
			return err
		}
	}

	if DB == nil {
		DB = conn
	}

	return nil
}
