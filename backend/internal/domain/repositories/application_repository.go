package repositories

import (
	"context"

	"super2025-backend/internal/domain/entities"
)

// ApplicationRepository defines the interface for application data persistence
type ApplicationRepository interface {
	// Create creates a new application
	Create(ctx context.Context, application *entities.Application) error
	
	// GetByID retrieves an application by its ID
	GetByID(ctx context.Context, id string) (*entities.Application, error)
	
	// GetByEmailAndPosition retrieves an application by email and position
	GetByEmailAndPosition(ctx context.Context, email, positionID string) (*entities.Application, error)
	
	// List retrieves applications with filters and pagination
	List(ctx context.Context, filter ApplicationFilter) ([]*entities.Application, int64, error)
	
	// Update updates an existing application
	Update(ctx context.Context, application *entities.Application) error
	
	// Delete deletes an application by ID
	Delete(ctx context.Context, id string) error
	
	// UpdateStatus updates the status of an application
	UpdateStatus(ctx context.Context, id string, status entities.ApplicationStatus, processedBy string) error
}

// ApplicationFilter represents filters for listing applications
type ApplicationFilter struct {
	PositionID string                       `json:"position_id,omitempty"`
	Status     entities.ApplicationStatus   `json:"status,omitempty"`
	Email      string                       `json:"email,omitempty"`
	DateFrom   string                       `json:"date_from,omitempty"`
	DateTo     string                       `json:"date_to,omitempty"`
	
	// Pagination
	Page     int `json:"page" validate:"min=1"`
	PageSize int `json:"page_size" validate:"min=1,max=100"`
	
	// Sorting
	SortBy    string `json:"sort_by,omitempty" validate:"omitempty,oneof=created_at updated_at name email status"`
	SortOrder string `json:"sort_order,omitempty" validate:"omitempty,oneof=asc desc"`
}

// DefaultFilter returns a default application filter
func DefaultFilter() ApplicationFilter {
	return ApplicationFilter{
		Page:      1,
		PageSize:  20,
		SortBy:    "created_at",
		SortOrder: "desc",
	}
} 