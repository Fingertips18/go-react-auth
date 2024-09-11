package database

import (
	"bytes"
	"log"
	"testing"
)

func TestConnectDB(t *testing.T) {
	var buf bytes.Buffer
	log.SetOutput(&buf)

	ConnectDB()

	if buf.String() != "" {
		t.Errorf("Expected no log output, but got: %s", buf.String())
	}

	if Instance == nil {
		t.Error("Expected Instance to be set, but it is nil")
	} else {
		t.Logf("Instance: %v", Instance.Name())
	}
}
