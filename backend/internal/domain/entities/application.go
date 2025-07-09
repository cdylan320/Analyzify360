package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ApplicationStatus represents the current status of a job application
type ApplicationStatus string

const (
	StatusPending   ApplicationStatus = "pending"
	StatusReviewing ApplicationStatus = "reviewing"
	StatusInterview ApplicationStatus = "interview"
	StatusOffered   ApplicationStatus = "offered"
	StatusRejected  ApplicationStatus = "rejected"
	StatusWithdrawn ApplicationStatus = "withdrawn"
)

// Application represents a job application in the domain
type Application struct {
	ID          string            `json:"id" gorm:"type:varchar(50);primaryKey"`
	PositionID  string            `json:"position_id" gorm:"not null"`
	Name        string            `json:"name" gorm:"not null"`
	Email       string            `json:"email" gorm:"not null"`
	Phone       string            `json:"phone"`
	CoverLetter string            `json:"cover_letter" gorm:"type:text;not null"`
	ResumeURL   string            `json:"resume_url" gorm:"not null"`
	Status      ApplicationStatus `json:"status" gorm:"default:pending"`
	CreatedAt   time.Time         `json:"created_at"`
	UpdatedAt   time.Time         `json:"updated_at"`
	DeletedAt   gorm.DeletedAt    `json:"-" gorm:"index"`
	
	// Metadata
	IPAddress   string `json:"ip_address,omitempty"`
	UserAgent   string `json:"user_agent,omitempty"`
	Source      string `json:"source,omitempty" gorm:"default:website"`
	
	// Processing info
	ProcessedAt *time.Time `json:"processed_at,omitempty"`
	ProcessedBy string     `json:"processed_by,omitempty"`
	Notes       string     `json:"notes,omitempty" gorm:"type:text"`
}

// BeforeCreate sets the ID if not already set
func (a *Application) BeforeCreate(tx *gorm.DB) error {
	if a.ID == "" {
		a.ID = uuid.New().String()
	}
	return nil
}

// UpdateStatus updates the application status (simplified version)
func (a *Application) UpdateStatus(newStatus ApplicationStatus, processedBy string) error {
	a.Status = newStatus
	now := time.Now()
	a.ProcessedAt = &now
	a.ProcessedBy = processedBy
	a.UpdatedAt = now
	return nil
}

// TableName returns the table name for GORM
func (Application) TableName() string {
	return "applications"
} 