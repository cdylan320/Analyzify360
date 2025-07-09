package handlers

import (
	"fmt"
	"io"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

	"super2025-backend/internal/application/dto"
	"super2025-backend/internal/application/services"
	"super2025-backend/internal/domain/entities"
	"super2025-backend/internal/infrastructure/config"
	"super2025-backend/internal/infrastructure/file_storage"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

// ApplicationHandler handles HTTP requests for applications
type ApplicationHandler struct {
	applicationService *services.ApplicationService
	localStorage       *file_storage.LocalStorage
	logger             *zap.Logger
	config             *config.Config
}

// NewApplicationHandler creates a new application handler
func NewApplicationHandler(
	applicationService *services.ApplicationService,
	localStorage *file_storage.LocalStorage,
	logger *zap.Logger,
	config *config.Config,
) *ApplicationHandler {
	return &ApplicationHandler{
		applicationService: applicationService,
		localStorage:       localStorage,
		logger:             logger,
		config:             config,
	}
}

// CreateApplication handles POST /api/v1/applications
func (h *ApplicationHandler) CreateApplication(c *gin.Context) {
	// Parse multipart form
	if err := c.Request.ParseMultipartForm(h.config.FileStorage.MaxFileSize); err != nil {
		h.logger.Error("Failed to parse multipart form", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form data"})
		return
	}

	// Extract form fields
	req := dto.CreateApplicationRequest{
		Name:        c.PostForm("fullName"),
		Email:       c.PostForm("email"),
		Phone:       c.PostForm("phone"),
		PositionID:  c.PostForm("position"),
		CoverLetter: c.PostForm("coverLetter"),
	}

	// Validate required fields
	if req.Name == "" || req.Email == "" || req.PositionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields: fullName, email, and position are required"})
		return
	}

	// Handle file upload
	file, header, err := c.Request.FormFile("resume")
	if err != nil {
		h.logger.Error("Failed to get resume file", zap.Error(err))
		c.JSON(http.StatusBadRequest, gin.H{"error": "Resume file is required"})
		return
	}
	defer file.Close()

	// Validate file type
	allowedTypes := []string{".pdf", ".doc", ".docx"}
	fileExt := strings.ToLower(filepath.Ext(header.Filename))
	if !contains(allowedTypes, fileExt) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only PDF, DOC, and DOCX files are allowed"})
		return
	}

	// Validate file size
	if header.Size > h.config.FileStorage.MaxFileSize {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("File size exceeds maximum allowed size of %d bytes", h.config.FileStorage.MaxFileSize)})
		return
	}

	// Read file content
	fileContent, err := io.ReadAll(file)
	if err != nil {
		h.logger.Error("Failed to read file content", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read resume file"})
		return
	}



	// Get client IP and User-Agent for metadata
	clientIP := c.ClientIP()
	userAgent := c.GetHeader("User-Agent")
	metadata := map[string]string{
		"ip_address": clientIP,
		"user_agent": userAgent,
		"source":     "web",
	}

	// Create application
	response, err := h.applicationService.CreateApplication(c.Request.Context(), &req, fileContent, header.Filename, metadata)
	if err != nil {
		h.logger.Error("Failed to create application", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create application"})
		return
	}

	h.logger.Info("Application created successfully", 
		zap.String("application_id", response.ID),
		zap.String("email", req.Email),
		zap.String("position", req.PositionID))

	c.JSON(http.StatusCreated, response)
}

// GetApplications handles GET /api/v1/applications
func (h *ApplicationHandler) GetApplications(c *gin.Context) {
	// Parse query parameters
	pageStr := c.DefaultQuery("page", "1")
	pageSizeStr := c.DefaultQuery("page_size", "20")
	
	// Parse pagination
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil || pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}

	// Prepare request
	req := &dto.ListApplicationsRequest{
		PositionID: c.Query("position_id"),
		Email:      c.Query("email"),
		DateFrom:   c.Query("date_from"),
		DateTo:     c.Query("date_to"),
		Page:       page,
		PageSize:   pageSize,
		SortBy:     c.DefaultQuery("sort_by", "created_at"),
		SortOrder:  c.DefaultQuery("sort_order", "desc"),
	}

	// Parse status if provided
	if statusStr := c.Query("status"); statusStr != "" {
		req.Status = entities.ApplicationStatus(statusStr)
	}

	// Get applications
	response, err := h.applicationService.ListApplications(c.Request.Context(), req)
	if err != nil {
		h.logger.Error("Failed to get applications", zap.Error(err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get applications"})
		return
	}

	c.JSON(http.StatusOK, response)
}

// GetApplication handles GET /api/v1/applications/:id
func (h *ApplicationHandler) GetApplication(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid application ID"})
		return
	}

	response, err := h.applicationService.GetApplication(c.Request.Context(), idStr)
	if err != nil {
		h.logger.Error("Failed to get application", zap.String("id", idStr), zap.Error(err))
		c.JSON(http.StatusNotFound, gin.H{"error": "Application not found"})
		return
	}

	c.JSON(http.StatusOK, response)
}

// UpdateApplicationStatus handles PUT /api/v1/applications/:id/status
func (h *ApplicationHandler) UpdateApplicationStatus(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid application ID"})
		return
	}

	var req dto.UpdateApplicationStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Validate status
	validStatuses := []entities.ApplicationStatus{
		entities.StatusPending,
		entities.StatusReviewing,
		entities.StatusInterview,
		entities.StatusOffered,
		entities.StatusRejected,
	}
	if !containsStatus(validStatuses, req.Status) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid status"})
		return
	}

	response, err := h.applicationService.UpdateApplicationStatus(c.Request.Context(), idStr, &req)
	if err != nil {
		h.logger.Error("Failed to update application status", zap.String("id", idStr), zap.Error(err))
		c.JSON(http.StatusNotFound, gin.H{"error": "Application not found"})
		return
	}

	c.JSON(http.StatusOK, response)
}

// DeleteApplication handles DELETE /api/v1/applications/:id
func (h *ApplicationHandler) DeleteApplication(c *gin.Context) {
	idStr := c.Param("id")
	if idStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid application ID"})
		return
	}

	if err := h.applicationService.DeleteApplication(c.Request.Context(), idStr); err != nil {
		h.logger.Error("Failed to delete application", zap.String("id", idStr), zap.Error(err))
		c.JSON(http.StatusNotFound, gin.H{"error": "Application not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Application deleted successfully"})
}

// GetResumeFile handles GET /api/v1/files/resumes/:filename
func (h *ApplicationHandler) GetResumeFile(c *gin.Context) {
	filename := c.Param("filename")
	if filename == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Filename is required"})
		return
	}

	// Serve file from local storage
	file, size, err := h.localStorage.ServeFile(filename)
	if err != nil {
		h.logger.Error("Failed to serve file", zap.String("filename", filename), zap.Error(err))
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}
	defer func() {
		if closer, ok := file.(io.Closer); ok {
			closer.Close()
		}
	}()

	// Set appropriate headers
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", filename))
	c.Header("Content-Length", strconv.FormatInt(size, 10))

	// Stream file to response
	io.Copy(c.Writer, file)
}

// Utility functions
func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func containsStatus(slice []entities.ApplicationStatus, item entities.ApplicationStatus) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
} 