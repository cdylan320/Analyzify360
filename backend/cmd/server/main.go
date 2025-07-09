package main

import (
	"fmt"
	"log"

	"super2025-backend/internal/application/services"
	"super2025-backend/internal/domain/entities"
	"super2025-backend/internal/infrastructure/config"
	"super2025-backend/internal/infrastructure/database"
	"super2025-backend/internal/infrastructure/email"
	"super2025-backend/internal/infrastructure/file_storage"
	"super2025-backend/internal/infrastructure/repositories"
	"super2025-backend/internal/presentation/handlers"
	"super2025-backend/internal/presentation/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

func main() {
	// Initialize logger
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("Failed to load configuration:", err)
	}

	// Initialize database
	db := initDatabase(cfg, logger)
	
	// Auto-migrate (simple)
	fmt.Println("Running migrations...")
	if err := db.AutoMigrate(&entities.Application{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	fmt.Println("Migrations completed")

	// Initialize repositories
	applicationRepo := repositories.NewPostgresApplicationRepository(db)

	// Initialize services
	localStorage, err := file_storage.NewLocalStorage(cfg, logger)
	if err != nil {
		log.Fatal("Failed to initialize local storage:", err)
	}
	emailService := email.NewEmailService(cfg, logger)
	applicationService := services.NewApplicationService(applicationRepo, localStorage, emailService, logger)

	// Initialize handlers
	applicationHandler := handlers.NewApplicationHandler(applicationService, localStorage, logger, cfg)

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

	// Setup routes (this will include CORS middleware)
	routes.SetupRoutes(r, applicationHandler, cfg)

	log.Printf("Server starting on port %s", cfg.Server.Port)
	if err := r.Run(":" + cfg.Server.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

// initDatabase initializes the database connection
func initDatabase(cfg *config.Config, logger *zap.Logger) *gorm.DB {
	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		logger.Fatal("Failed to connect to database", zap.Error(err))
	}
	logger.Info("Database connected successfully")
	return db
} 