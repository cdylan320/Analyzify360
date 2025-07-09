package services

import (
	"context"
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"super2025-backend/internal/application/dto"
	"super2025-backend/internal/domain/entities"
	domainErrors "super2025-backend/internal/domain/errors"
	"super2025-backend/internal/domain/repositories"
)

// FileStorageService defines the interface for file storage operations
type FileStorageService interface {
	Upload(ctx context.Context, filename string, content []byte) (string, error)
	Delete(ctx context.Context, url string) error
	GetSignedURL(ctx context.Context, url string, expiration time.Duration) (string, error)
}

// EmailService defines the interface for email operations
type EmailService interface {
	SendApplicationConfirmation(candidateEmail, candidateName, position string) error
	SendHRNotification(candidateEmail, candidateName, position, resumeURL string) error
}

// ApplicationService implements business logic for job applications
type ApplicationService struct {
	applicationRepo repositories.ApplicationRepository
	fileStorage     FileStorageService
	emailService    EmailService
	logger          *zap.Logger
}

// NewApplicationService creates a new application service
func NewApplicationService(
	applicationRepo repositories.ApplicationRepository,
	fileStorage FileStorageService,
	emailService EmailService,
	logger *zap.Logger,
) *ApplicationService {
	return &ApplicationService{
		applicationRepo: applicationRepo,
		fileStorage:     fileStorage,
		emailService:    emailService,
		logger:          logger,
	}
}

// CreateApplication creates a new job application
func (s *ApplicationService) CreateApplication(
	ctx context.Context,
	req *dto.CreateApplicationRequest,
	resumeFile []byte,
	resumeFilename string,
	metadata map[string]string,
) (*dto.ApplicationResponse, error) {
	// Validate if application already exists for this position and email
	existing, err := s.applicationRepo.GetByEmailAndPosition(ctx, req.Email, req.PositionID)
	if err != nil && err != domainErrors.ErrApplicationNotFound {
		s.logger.Error("Failed to check existing application", zap.Error(err))
		return nil, domainErrors.ErrDatabaseQuery
	}
	if existing != nil {
		return nil, domainErrors.ErrApplicationAlreadyExists
	}

	// Upload resume file
	resumeURL, err := s.uploadResume(ctx, resumeFile, resumeFilename, req.Email)
	if err != nil {
		s.logger.Error("Failed to upload resume", zap.Error(err))
		return nil, err
	}

	// Create application entity
	application := &entities.Application{
		ID:          uuid.New().String(),
		PositionID:  req.PositionID,
		Name:        req.Name,
		Email:       req.Email,
		Phone:       req.Phone,
		CoverLetter: req.CoverLetter,
		ResumeURL:   resumeURL,
		Status:      entities.StatusPending,
		IPAddress:   metadata["ip_address"],
		UserAgent:   metadata["user_agent"],
		Source:      metadata["source"],
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	// Save to database
	if err := s.applicationRepo.Create(ctx, application); err != nil {
		s.logger.Error("Failed to create application", zap.Error(err))
		
		// Clean up uploaded file
		if deleteErr := s.fileStorage.Delete(ctx, resumeURL); deleteErr != nil {
			s.logger.Error("Failed to cleanup uploaded file", zap.Error(deleteErr))
		}
		
		return nil, domainErrors.ErrDatabaseQuery
	}

	// Send confirmation email (async)
	go func() {
		if err := s.emailService.SendApplicationConfirmation(application.Email, application.Name, application.PositionID); err != nil {
			s.logger.Error("Failed to send confirmation email", 
				zap.String("email", application.Email),
				zap.Error(err))
		}
	}()

	// Send notification email to HR (async)
	// Note: Sending TO HR ABOUT this candidate
	go func() {
		if err := s.emailService.SendHRNotification(
			application.Email,     // Candidate's email (for reference)
			application.Name,      // Candidate's name
			application.PositionID, // Position applied for
			application.ResumeURL, // Resume download link
		); err != nil {
			s.logger.Error("Failed to send HR notification email", 
				zap.String("candidate_email", application.Email),
				zap.String("candidate_name", application.Name),
				zap.Error(err))
		}
	}()

	s.logger.Info("Application created successfully", 
		zap.String("id", application.ID),
		zap.String("email", application.Email),
		zap.String("position", application.PositionID))

	return dto.ToApplicationResponse(application), nil
}

// GetApplication retrieves an application by ID
func (s *ApplicationService) GetApplication(ctx context.Context, id string) (*dto.ApplicationResponse, error) {
	application, err := s.applicationRepo.GetByID(ctx, id)
	if err != nil {
		if err == domainErrors.ErrApplicationNotFound {
			return nil, err
		}
		s.logger.Error("Failed to get application", zap.String("id", id), zap.Error(err))
		return nil, domainErrors.ErrDatabaseQuery
	}

	return dto.ToApplicationResponse(application), nil
}

// ListApplications retrieves applications with filters and pagination
func (s *ApplicationService) ListApplications(ctx context.Context, req *dto.ListApplicationsRequest) (*dto.ListApplicationsResponse, error) {
	// Convert DTO to repository filter
	filter := repositories.ApplicationFilter{
		PositionID: req.PositionID,
		Status:     req.Status,
		Email:      req.Email,
		DateFrom:   req.DateFrom,
		DateTo:     req.DateTo,
		Page:       req.Page,
		PageSize:   req.PageSize,
		SortBy:     req.SortBy,
		SortOrder:  req.SortOrder,
	}

	// Set defaults
	if filter.Page == 0 {
		filter.Page = 1
	}
	if filter.PageSize == 0 {
		filter.PageSize = 20
	}
	if filter.SortBy == "" {
		filter.SortBy = "created_at"
	}
	if filter.SortOrder == "" {
		filter.SortOrder = "desc"
	}

	applications, total, err := s.applicationRepo.List(ctx, filter)
	if err != nil {
		s.logger.Error("Failed to list applications", zap.Error(err))
		return nil, domainErrors.ErrDatabaseQuery
	}

	return &dto.ListApplicationsResponse{
		Applications: dto.ToApplicationResponseList(applications),
		Pagination:   dto.CalculatePagination(filter.Page, filter.PageSize, total),
	}, nil
}

// UpdateApplicationStatus updates the status of an application
func (s *ApplicationService) UpdateApplicationStatus(
	ctx context.Context,
	id string,
	req *dto.UpdateApplicationStatusRequest,
) (*dto.ApplicationResponse, error) {
	// Get current application
	application, err := s.applicationRepo.GetByID(ctx, id)
	if err != nil {
		if err == domainErrors.ErrApplicationNotFound {
			return nil, err
		}
		s.logger.Error("Failed to get application for status update", 
			zap.String("id", id), zap.Error(err))
		return nil, domainErrors.ErrDatabaseQuery
	}

	// Update status using domain logic
	if err := application.UpdateStatus(req.Status, req.ProcessedBy); err != nil {
		s.logger.Error("Invalid status transition", 
			zap.String("id", id),
			zap.String("from", string(application.Status)),
			zap.String("to", string(req.Status)),
			zap.Error(err))
		return nil, err
	}

	// Update notes if provided
	if req.Notes != "" {
		application.Notes = req.Notes
	}

	// Save to database
	if err := s.applicationRepo.Update(ctx, application); err != nil {
		s.logger.Error("Failed to update application status", 
			zap.String("id", id), zap.Error(err))
		return nil, domainErrors.ErrDatabaseQuery
	}

	s.logger.Info("Application status updated", 
		zap.String("id", id),
		zap.String("status", string(req.Status)),
		zap.String("processed_by", req.ProcessedBy))

	return dto.ToApplicationResponse(application), nil
}

// DeleteApplication deletes an application
func (s *ApplicationService) DeleteApplication(ctx context.Context, id string) error {
	// Get application to get resume URL for cleanup
	application, err := s.applicationRepo.GetByID(ctx, id)
	if err != nil {
		if err == domainErrors.ErrApplicationNotFound {
			return err
		}
		s.logger.Error("Failed to get application for deletion", 
			zap.String("id", id), zap.Error(err))
		return domainErrors.ErrDatabaseQuery
	}

	// Delete from database
	if err := s.applicationRepo.Delete(ctx, id); err != nil {
		s.logger.Error("Failed to delete application", 
			zap.String("id", id), zap.Error(err))
		return domainErrors.ErrDatabaseQuery
	}

	// Clean up resume file (async)
	go func() {
		if err := s.fileStorage.Delete(ctx, application.ResumeURL); err != nil {
			s.logger.Error("Failed to delete resume file", 
				zap.String("url", application.ResumeURL), zap.Error(err))
		}
	}()

	s.logger.Info("Application deleted successfully", zap.String("id", id))
	return nil
}

// GetResumeSignedURL generates a signed URL for resume download
func (s *ApplicationService) GetResumeSignedURL(ctx context.Context, id string, expiration time.Duration) (string, error) {
	application, err := s.applicationRepo.GetByID(ctx, id)
	if err != nil {
		if err == domainErrors.ErrApplicationNotFound {
			return "", err
		}
		s.logger.Error("Failed to get application for resume URL", 
			zap.String("id", id), zap.Error(err))
		return "", domainErrors.ErrDatabaseQuery
	}

	signedURL, err := s.fileStorage.GetSignedURL(ctx, application.ResumeURL, expiration)
	if err != nil {
		s.logger.Error("Failed to generate signed URL", 
			zap.String("url", application.ResumeURL), zap.Error(err))
		return "", domainErrors.ErrFileUploadFailed
	}

	return signedURL, nil
}

// uploadResume uploads a resume file and returns the URL
func (s *ApplicationService) uploadResume(ctx context.Context, fileContent []byte, filename, email string) (string, error) {
	// Validate file type
	if !s.isValidResumeFile(filename) {
		return "", domainErrors.ErrInvalidFileType
	}

	// Generate unique filename
	ext := filepath.Ext(filename)
	cleanEmail := strings.ReplaceAll(email, "@", "_")
	uniqueFilename := fmt.Sprintf("%s_%d%s", cleanEmail, time.Now().Unix(), ext)

	// Upload file
	url, err := s.fileStorage.Upload(ctx, uniqueFilename, fileContent)
	if err != nil {
		return "", domainErrors.ErrFileUploadFailed
	}

	return url, nil
}

// isValidResumeFile checks if the file type is valid for resumes
func (s *ApplicationService) isValidResumeFile(filename string) bool {
	ext := strings.ToLower(filepath.Ext(filename))
	validExtensions := []string{".pdf", ".doc", ".docx"}
	
	for _, validExt := range validExtensions {
		if ext == validExt {
			return true
		}
	}
	return false
} 

// TestEmailConfiguration sends a test email to verify email setup
func (s *ApplicationService) TestEmailConfiguration(ctx context.Context, testEmail string) error {
	// Send a simple test email
	return s.emailService.SendApplicationConfirmation(testEmail, "Test User", "Email Configuration Test")
} 