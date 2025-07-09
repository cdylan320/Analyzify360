package routes

import (
	"super2025-backend/internal/infrastructure/config"
	"super2025-backend/internal/presentation/handlers"
	"super2025-backend/internal/presentation/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configures all HTTP routes
func SetupRoutes(
	router *gin.Engine, 
	applicationHandler *handlers.ApplicationHandler,
	cfg *config.Config,
) {
	// Setup CORS middleware
	router.Use(middleware.SetupCORS(cfg))

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "super2025-backend",
			"version": "1.0.0",
		})
	})

	// Simple test endpoint
	router.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Server is running successfully! 🚀",
			"status":  "success",
			"timestamp": "2024-01-01T12:00:00Z",
			"server": "Super 2025 Backend",
		})
	})

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Application routes
		applications := v1.Group("/applications")
		{
			applications.POST("", applicationHandler.CreateApplication)
			applications.GET("", applicationHandler.GetApplications)
			applications.GET("/:id", applicationHandler.GetApplication)
			applications.PUT("/:id/status", applicationHandler.UpdateApplicationStatus)
			applications.DELETE("/:id", applicationHandler.DeleteApplication)
		}

		// File serving routes
		files := v1.Group("/files")
		{
			files.GET("/resumes/:filename", applicationHandler.GetResumeFile)
		}

		// Test routes (for development/debugging)
		v1.GET("/test-email", applicationHandler.TestEmail)
	}
} 