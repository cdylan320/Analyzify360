package middleware

import (
	"super2025-backend/internal/infrastructure/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupCORS configures CORS middleware
func SetupCORS(cfg *config.Config) gin.HandlerFunc {
	corsConfig := cors.DefaultConfig()
	
	// Allow frontend origins - include both local and deployed
	corsConfig.AllowOrigins = []string{
		cfg.Application.FrontendURL,
		"http://localhost:3000", // Development frontend
		"http://127.0.0.1:3000",
		"https://analyzify360.vercel.app", // Your Vercel deployment
		"https://analyzify360.com", // Your custom domain (if using)
		"https://www.analyzify360.com", // WWW version
	}
	
	corsConfig.AllowMethods = []string{
		"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS",
	}
	
	corsConfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Content-Length",
		"Accept-Encoding",
		"X-CSRF-Token",
		"Authorization",
		"Accept",
		"Origin",
		"Cache-Control",
		"X-Requested-With",
	}
	
	corsConfig.ExposeHeaders = []string{
		"Content-Length",
		"Content-Type",
		"Content-Disposition",
	}
	
	corsConfig.AllowCredentials = true
	
	return cors.New(corsConfig)
} 