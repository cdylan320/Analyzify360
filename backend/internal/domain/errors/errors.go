package errors

import "errors"

var (
	// Application errors
	ErrApplicationNotFound      = errors.New("application not found")
	ErrApplicationAlreadyExists = errors.New("application already exists for this position")
	ErrInvalidStatusTransition  = errors.New("invalid status transition")
	ErrInvalidApplicationData   = errors.New("invalid application data")
	
	// File upload errors
	ErrFileNotFound         = errors.New("file not found")
	ErrFileTooLarge         = errors.New("file size exceeds maximum allowed")
	ErrInvalidFileType      = errors.New("invalid file type")
	ErrFileUploadFailed     = errors.New("file upload failed")
	
	// Database errors
	ErrDatabaseConnection = errors.New("database connection failed")
	ErrDatabaseQuery      = errors.New("database query failed")
	ErrDatabaseTransaction = errors.New("database transaction failed")
	
	// Validation errors
	ErrValidationFailed = errors.New("validation failed")
	ErrInvalidEmail     = errors.New("invalid email format")
	ErrInvalidPhone     = errors.New("invalid phone number format")
	
	// General errors
	ErrInternalServer = errors.New("internal server error")
	ErrUnauthorized   = errors.New("unauthorized")
	ErrForbidden      = errors.New("forbidden")
	ErrBadRequest     = errors.New("bad request")
) 