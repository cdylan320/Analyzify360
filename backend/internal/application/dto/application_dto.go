package dto

import (
	"time"

	"super2025-backend/internal/domain/entities"
)

// CreateApplicationRequest represents the request to create a new application
type CreateApplicationRequest struct {
	PositionID  string `json:"position_id" validate:"required" example:"senior-ai-engineer"`
	Name        string `json:"name" validate:"required,min=2,max=100" example:"John Doe"`
	Email       string `json:"email" validate:"required,email" example:"john.doe@example.com"`
	Phone       string `json:"phone" validate:"omitempty,min=10,max=20" example:"+1234567890"`
	CoverLetter string `json:"cover_letter" validate:"required,min=50,max=2000" example:"I am excited to apply for this position..."`
}

// ApplicationResponse represents the response for application operations
type ApplicationResponse struct {
	ID          string                      `json:"id" example:"123e4567-e89b-12d3-a456-426614174000"`
	PositionID  string                      `json:"position_id" example:"senior-ai-engineer"`
	Name        string                      `json:"name" example:"John Doe"`
	Email       string                      `json:"email" example:"john.doe@example.com"`
	Phone       string                      `json:"phone" example:"+1234567890"`
	CoverLetter string                      `json:"cover_letter" example:"I am excited to apply for this position..."`
	ResumeURL   string                      `json:"resume_url" example:"https://example.com/resumes/123.pdf"`
	Status      entities.ApplicationStatus  `json:"status" example:"pending"`
	CreatedAt   time.Time                   `json:"created_at" example:"2023-01-01T12:00:00Z"`
	UpdatedAt   time.Time                   `json:"updated_at" example:"2023-01-01T12:00:00Z"`
	ProcessedAt *time.Time                  `json:"processed_at,omitempty" example:"2023-01-01T12:00:00Z"`
	ProcessedBy string                      `json:"processed_by,omitempty" example:"admin@example.com"`
	Notes       string                      `json:"notes,omitempty" example:"Candidate has strong background"`
}

// ListApplicationsRequest represents the request to list applications
type ListApplicationsRequest struct {
	PositionID string                      `json:"position_id,omitempty" form:"position_id" example:"senior-ai-engineer"`
	Status     entities.ApplicationStatus  `json:"status,omitempty" form:"status" example:"pending"`
	Email      string                      `json:"email,omitempty" form:"email" example:"john.doe@example.com"`
	DateFrom   string                      `json:"date_from,omitempty" form:"date_from" example:"2023-01-01"`
	DateTo     string                      `json:"date_to,omitempty" form:"date_to" example:"2023-12-31"`
	Page       int                         `json:"page" form:"page" validate:"min=1" example:"1"`
	PageSize   int                         `json:"page_size" form:"page_size" validate:"min=1,max=100" example:"20"`
	SortBy     string                      `json:"sort_by,omitempty" form:"sort_by" validate:"omitempty,oneof=created_at updated_at name email status" example:"created_at"`
	SortOrder  string                      `json:"sort_order,omitempty" form:"sort_order" validate:"omitempty,oneof=asc desc" example:"desc"`
}

// ListApplicationsResponse represents the response for listing applications
type ListApplicationsResponse struct {
	Applications []*ApplicationResponse `json:"applications"`
	Pagination   PaginationResponse     `json:"pagination"`
}

// PaginationResponse represents pagination information
type PaginationResponse struct {
	Page       int   `json:"page" example:"1"`
	PageSize   int   `json:"page_size" example:"20"`
	Total      int64 `json:"total" example:"100"`
	TotalPages int   `json:"total_pages" example:"5"`
	HasNext    bool  `json:"has_next" example:"true"`
	HasPrev    bool  `json:"has_prev" example:"false"`
}

// UpdateApplicationStatusRequest represents the request to update application status
type UpdateApplicationStatusRequest struct {
	Status      entities.ApplicationStatus `json:"status" validate:"required,oneof=pending reviewing interview offered rejected withdrawn" example:"reviewing"`
	ProcessedBy string                     `json:"processed_by" validate:"required" example:"admin@example.com"`
	Notes       string                     `json:"notes,omitempty" example:"Candidate has been reviewed"`
}

// FileUploadResponse represents the response for file upload
type FileUploadResponse struct {
	URL      string `json:"url" example:"https://example.com/resumes/123.pdf"`
	Filename string `json:"filename" example:"john_doe_resume.pdf"`
	Size     int64  `json:"size" example:"2048576"`
}

// ErrorResponse represents an error response
type ErrorResponse struct {
	Error   string `json:"error" example:"Validation failed"`
	Message string `json:"message" example:"The provided data is invalid"`
	Code    int    `json:"code" example:"400"`
}

// SuccessResponse represents a success response
type SuccessResponse struct {
	Message string      `json:"message" example:"Operation completed successfully"`
	Data    interface{} `json:"data,omitempty"`
}

// ToApplicationResponse converts an entity to a response DTO
func ToApplicationResponse(app *entities.Application) *ApplicationResponse {
	return &ApplicationResponse{
		ID:          app.ID,
		PositionID:  app.PositionID,
		Name:        app.Name,
		Email:       app.Email,
		Phone:       app.Phone,
		CoverLetter: app.CoverLetter,
		ResumeURL:   app.ResumeURL,
		Status:      app.Status,
		CreatedAt:   app.CreatedAt,
		UpdatedAt:   app.UpdatedAt,
		ProcessedAt: app.ProcessedAt,
		ProcessedBy: app.ProcessedBy,
		Notes:       app.Notes,
	}
}

// ToApplicationResponseList converts a slice of entities to response DTOs
func ToApplicationResponseList(apps []*entities.Application) []*ApplicationResponse {
	responses := make([]*ApplicationResponse, len(apps))
	for i, app := range apps {
		responses[i] = ToApplicationResponse(app)
	}
	return responses
}

// CalculatePagination calculates pagination information
func CalculatePagination(page, pageSize int, total int64) PaginationResponse {
	totalPages := int((total + int64(pageSize) - 1) / int64(pageSize))
	
	return PaginationResponse{
		Page:       page,
		PageSize:   pageSize,
		Total:      total,
		TotalPages: totalPages,
		HasNext:    page < totalPages,
		HasPrev:    page > 1,
	}
} 