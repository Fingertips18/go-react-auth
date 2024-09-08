package database

import (
	"log"
	"os"

	"github.com/supabase-community/supabase-go"
)

func ConnectDB() {
	API_URL := os.Getenv("SUPABASE_URL")
	API_KEY := os.Getenv("SUPABASE_PUBLIC_KEY")
	_, err := supabase.NewClient(API_URL, API_KEY, nil)
	if err != nil {
		log.Fatal("Error creating supabase client %v", err)
	}

}
