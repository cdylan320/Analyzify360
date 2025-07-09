package config

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Config holds all configuration for the application
type Config struct {
	Database    DatabaseConfig
	Server      ServerConfig
	FileStorage FileStorageConfig
	Email       EmailConfig
	Application ApplicationConfig
}

// DatabaseConfig holds database configuration
type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

// ServerConfig holds server configuration
type ServerConfig struct {
	Port    string
	GinMode string
}

// FileStorageConfig holds file storage configuration
type FileStorageConfig struct {
	Type        string // "local" or "s3"
	UploadDir   string
	MaxFileSize int64
	
	// S3 specific
	AWSRegion          string
	AWSAccessKeyID     string
	AWSSecretAccessKey string
	S3BucketName       string
}

// EmailConfig holds email configuration
type EmailConfig struct {
	SMTPHost     string
	SMTPPort     string
	SMTPUsername string
	SMTPPassword string
	FromEmail    string
	HREmail      string
}

// ApplicationConfig holds application configuration
type ApplicationConfig struct {
	BaseURL     string
	FrontendURL string
}

// Load loads configuration from environment variables
func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }
	

	maxFileSize, err := strconv.ParseInt(getEnv("MAX_FILE_SIZE", "5242880"), 10, 64)
	if err != nil {
		return nil, fmt.Errorf("invalid MAX_FILE_SIZE: %w", err)
	}

	return &Config{
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "password"),
			Name:     getEnv("DB_NAME", "super2025_careers"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
		},
		Server: ServerConfig{
			Port:    getEnv("PORT", "8081"),
			GinMode: getEnv("GIN_MODE", "debug"),
		},
		FileStorage: FileStorageConfig{
			Type:               getEnv("STORAGE_TYPE", "local"),
			UploadDir:          getEnv("UPLOAD_DIR", "./uploads/resumes"),
			MaxFileSize:        maxFileSize,
			AWSRegion:          getEnv("AWS_REGION", ""),
			AWSAccessKeyID:     getEnv("AWS_ACCESS_KEY_ID", ""),
			AWSSecretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY", ""),
			S3BucketName:       getEnv("S3_BUCKET_NAME", ""),
		},
		Email: EmailConfig{
			SMTPHost:     getEnv("SMTP_HOST", "smtp.gmail.com"),
			SMTPPort:     getEnv("SMTP_PORT", "587"),
			SMTPUsername: getEnv("SMTP_USERNAME", ""),
			SMTPPassword: getEnv("SMTP_PASSWORD", ""),
			FromEmail:    getEnv("FROM_EMAIL", "careers@super2025.com"),
			HREmail:      getEnv("HR_EMAIL", "hr@super2025.com"),
		},
		Application: ApplicationConfig{
			BaseURL:     getEnv("API_BASE_URL", "http://localhost:8080"),
			FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
		},
	}, nil
}

// getEnv gets an environment variable with a fallback value
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
} 