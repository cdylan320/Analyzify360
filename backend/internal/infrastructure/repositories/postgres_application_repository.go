package repositories

import (
	"context"
	"fmt"
	"time"

	"super2025-backend/internal/domain/entities"
	"super2025-backend/internal/domain/errors"
	"super2025-backend/internal/domain/repositories"

	"gorm.io/gorm"
)

// PostgresApplicationRepository implements the ApplicationRepository interface
type PostgresApplicationRepository struct {
	db *gorm.DB
}

// NewPostgresApplicationRepository creates a new PostgreSQL application repository
func NewPostgresApplicationRepository(db *gorm.DB) *PostgresApplicationRepository {
	return &PostgresApplicationRepository{
		db: db,
	}
}

// Create creates a new application in the database
func (r *PostgresApplicationRepository) Create(ctx context.Context, application *entities.Application) error {
	if err := r.db.WithContext(ctx).Create(application).Error; err != nil {
		return fmt.Errorf("failed to create application: %w", err)
	}
	return nil
}

// GetByID retrieves an application by ID
func (r *PostgresApplicationRepository) GetByID(ctx context.Context, id string) (*entities.Application, error) {
	var application entities.Application
	if err := r.db.WithContext(ctx).First(&application, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrApplicationNotFound
		}
		return nil, fmt.Errorf("failed to get application: %w", err)
	}
	return &application, nil
}

// GetByEmailAndPosition retrieves an application by email and position
func (r *PostgresApplicationRepository) GetByEmailAndPosition(ctx context.Context, email, positionID string) (*entities.Application, error) {
	var application entities.Application
	if err := r.db.WithContext(ctx).First(&application, "email = ? AND position_id = ?", email, positionID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.ErrApplicationNotFound
		}
		return nil, fmt.Errorf("failed to get application: %w", err)
	}
	return &application, nil
}

// List retrieves applications with filters and pagination
func (r *PostgresApplicationRepository) List(ctx context.Context, filter repositories.ApplicationFilter) ([]*entities.Application, int64, error) {
	var applications []*entities.Application
	var total int64

	query := r.db.WithContext(ctx).Model(&entities.Application{})

	// Apply filters
	if filter.Status != "" {
		query = query.Where("status = ?", filter.Status)
	}
	if filter.PositionID != "" {
		query = query.Where("position_id = ?", filter.PositionID)
	}
	if filter.Email != "" {
		query = query.Where("email ILIKE ?", "%"+filter.Email+"%")
	}
	if filter.DateFrom != "" {
		query = query.Where("created_at >= ?", filter.DateFrom)
	}
	if filter.DateTo != "" {
		query = query.Where("created_at <= ?", filter.DateTo)
	}

	// Count total records
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count applications: %w", err)
	}

	// Calculate offset
	offset := (filter.Page - 1) * filter.PageSize

	// Apply pagination and ordering
	orderClause := fmt.Sprintf("%s %s", filter.SortBy, filter.SortOrder)
	if err := query.Offset(offset).Limit(filter.PageSize).Order(orderClause).Find(&applications).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to get applications: %w", err)
	}

	return applications, total, nil
}

// Update updates an application
func (r *PostgresApplicationRepository) Update(ctx context.Context, application *entities.Application) error {
	application.UpdatedAt = time.Now()
	if err := r.db.WithContext(ctx).Save(application).Error; err != nil {
		return fmt.Errorf("failed to update application: %w", err)
	}
	return nil
}

// UpdateStatus updates the status of an application
func (r *PostgresApplicationRepository) UpdateStatus(ctx context.Context, id string, status entities.ApplicationStatus, processedBy string) error {
	now := time.Now()
	result := r.db.WithContext(ctx).Model(&entities.Application{}).
		Where("id = ?", id).
		Updates(map[string]interface{}{
			"status":       status,
			"processed_by": processedBy,
			"processed_at": &now,
			"updated_at":   now,
		})

	if result.Error != nil {
		return fmt.Errorf("failed to update application status: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.ErrApplicationNotFound
	}

	return nil
}

// Delete deletes an application
func (r *PostgresApplicationRepository) Delete(ctx context.Context, id string) error {
	result := r.db.WithContext(ctx).Delete(&entities.Application{}, "id = ?", id)
	if result.Error != nil {
		return fmt.Errorf("failed to delete application: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.ErrApplicationNotFound
	}

	return nil
}

// GetByEmail retrieves applications by email
func (r *PostgresApplicationRepository) GetByEmail(ctx context.Context, email string) ([]*entities.Application, error) {
	var applications []*entities.Application
	if err := r.db.WithContext(ctx).Where("email = ?", email).Order("created_at DESC").Find(&applications).Error; err != nil {
		return nil, fmt.Errorf("failed to get applications by email: %w", err)
	}
	return applications, nil
}

// GetByPosition retrieves applications by position
func (r *PostgresApplicationRepository) GetByPosition(ctx context.Context, position string) ([]*entities.Application, error) {
	var applications []*entities.Application
	if err := r.db.WithContext(ctx).Where("position = ?", position).Order("created_at DESC").Find(&applications).Error; err != nil {
		return nil, fmt.Errorf("failed to get applications by position: %w", err)
	}
	return applications, nil
}

// GetByDateRange retrieves applications within a date range
func (r *PostgresApplicationRepository) GetByDateRange(ctx context.Context, from, to time.Time) ([]*entities.Application, error) {
	var applications []*entities.Application
	if err := r.db.WithContext(ctx).Where("created_at BETWEEN ? AND ?", from, to).Order("created_at DESC").Find(&applications).Error; err != nil {
		return nil, fmt.Errorf("failed to get applications by date range: %w", err)
	}
	return applications, nil
}

// CountByStatus counts applications by status
func (r *PostgresApplicationRepository) CountByStatus(ctx context.Context, status entities.ApplicationStatus) (int64, error) {
	var count int64
	if err := r.db.WithContext(ctx).Model(&entities.Application{}).Where("status = ?", status).Count(&count).Error; err != nil {
		return 0, fmt.Errorf("failed to count applications by status: %w", err)
	}
	return count, nil
} 