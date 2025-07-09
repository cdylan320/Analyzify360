package main

import (
	"fmt"
	"log"

	"super2025-backend/internal/domain/entities"
	"super2025-backend/internal/infrastructure/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("Failed to load configuration:", err)
	}

	// Initialize database
	initDatabase(cfg)
	
	// Auto-migrate (simple)
	fmt.Println("Running migrations...")
	// db.AutoMigrate(&entities.Application{})
	fmt.Println("Migrations completed")

	// Setup Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "OK",
			"message": "Server is running",
			"version": "1.0.0",
		})
	})

	// Test endpoint
	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Backend is working!",
		})
	})

	// API routes placeholder
	api := r.Group("/api/v1")
	{
		api.GET("/applications", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Applications endpoint"})
		})
		
		api.POST("/applications", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Application submitted"})
		})
	}

	log.Printf("Server starting on port %s", cfg.Server.Port)
	if err := r.Run(":" + cfg.Server.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

// initDatabase initializes the database connection
func initDatabase(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		cfg.Database.Host,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Name,
		cfg.Database.Port,
		cfg.Database.SSLMode,
	)


	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}


	// Auto migrate schemas
    if err := db.AutoMigrate(
        &entities.Application{},
    ); err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

	fmt.Println("Database connected successfully")
	return db
} 