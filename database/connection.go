package database

import (
	"log"
	"os"

	"github.com/Fingertips18/go-auth/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var CONN *gorm.DB

func ConnectDB() error {
	URI := os.Getenv("SUPABASE_URI")
	connection, err := gorm.Open(postgres.Open(URI), &gorm.Config{
		SkipDefaultTransaction: true,
	})
	if err != nil {
		log.Fatalf("Error connecting to Supabase: %v", err)
		return err
	}

	if os.Getenv("RUN_MIGRATIONS") == "true" {
		log.Println("Running migration...")
		err = connection.AutoMigrate(&models.User{})
		if err != nil {
			log.Fatalf("Error running migrations: %v", err)
			return err
		}
	}

	CONN = connection

	return nil
}
