package file_storage

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"

	"super2025-backend/internal/infrastructure/config"

	"go.uber.org/zap"
)

// LocalStorage implements file storage using local filesystem
type LocalStorage struct {
	uploadDir string
	baseURL   string
	logger    *zap.Logger
}

// NewLocalStorage creates a new local storage instance
func NewLocalStorage(cfg *config.Config, logger *zap.Logger) (*LocalStorage, error) {
	// Create upload directory if it doesn't exist
	if err := os.MkdirAll(cfg.FileStorage.UploadDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create upload directory: %w", err)
	}

	return &LocalStorage{
		uploadDir: cfg.FileStorage.UploadDir,
		baseURL:   cfg.Application.BaseURL,
		logger:    logger,
	}, nil
}

// Upload uploads a file to local storage
func (ls *LocalStorage) Upload(ctx context.Context, filename string, content []byte) (string, error) {
	// Sanitize filename
	filename = sanitizeFilename(filename)
	
	// Create full file path
	filePath := filepath.Join(ls.uploadDir, filename)
	
	// Ensure the directory exists
	if err := os.MkdirAll(filepath.Dir(filePath), 0755); err != nil {
		ls.logger.Error("Failed to create directory", zap.String("path", filepath.Dir(filePath)), zap.Error(err))
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	// Write file to disk
	file, err := os.Create(filePath)
	if err != nil {
		ls.logger.Error("Failed to create file", zap.String("path", filePath), zap.Error(err))
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer file.Close()

	if _, err := file.Write(content); err != nil {
		ls.logger.Error("Failed to write file", zap.String("path", filePath), zap.Error(err))
		return "", fmt.Errorf("failed to write file: %w", err)
	}

	// Generate public URL
	publicURL := fmt.Sprintf("%s/api/v1/files/resumes/%s", ls.baseURL, filename)
	
	ls.logger.Info("File uploaded successfully", 
		zap.String("filename", filename), 
		zap.String("path", filePath),
		zap.String("url", publicURL))

	return publicURL, nil
}

// Delete deletes a file from local storage
func (ls *LocalStorage) Delete(ctx context.Context, url string) error {
	// Extract filename from URL
	filename := extractFilenameFromURL(url)
	if filename == "" {
		return fmt.Errorf("invalid URL: cannot extract filename")
	}

	filePath := filepath.Join(ls.uploadDir, filename)
	
	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		ls.logger.Warn("File does not exist", zap.String("path", filePath))
		return nil // Not an error if file doesn't exist
	}

	// Delete file
	if err := os.Remove(filePath); err != nil {
		ls.logger.Error("Failed to delete file", zap.String("path", filePath), zap.Error(err))
		return fmt.Errorf("failed to delete file: %w", err)
	}

	ls.logger.Info("File deleted successfully", zap.String("filename", filename), zap.String("path", filePath))
	return nil
}

// GetSignedURL generates a signed URL for file access (for local storage, just return the URL)
func (ls *LocalStorage) GetSignedURL(ctx context.Context, url string, expiration time.Duration) (string, error) {
	// For local storage, we'll just return the original URL
	// In a production environment, you might want to implement temporary tokens
	return url, nil
}

// ServeFile serves a file from local storage (used by HTTP handler)
func (ls *LocalStorage) ServeFile(filename string) (io.ReadSeeker, int64, error) {
	// Sanitize filename to prevent directory traversal
	filename = sanitizeFilename(filename)
	filePath := filepath.Join(ls.uploadDir, filename)

	// Check if file exists and is within upload directory
	absUploadDir, err := filepath.Abs(ls.uploadDir)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get absolute upload directory: %w", err)
	}

	absFilePath, err := filepath.Abs(filePath)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get absolute file path: %w", err)
	}

	if !strings.HasPrefix(absFilePath, absUploadDir) {
		return nil, 0, fmt.Errorf("file path outside upload directory")
	}

	// Open file
	file, err := os.Open(absFilePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, 0, fmt.Errorf("file not found")
		}
		return nil, 0, fmt.Errorf("failed to open file: %w", err)
	}

	// Get file size
	stat, err := file.Stat()
	if err != nil {
		file.Close()
		return nil, 0, fmt.Errorf("failed to get file stats: %w", err)
	}

	return file, stat.Size(), nil
}

// sanitizeFilename removes potentially dangerous characters from filename
func sanitizeFilename(filename string) string {
	// Replace path separators and dangerous characters
	filename = strings.ReplaceAll(filename, "/", "_")
	filename = strings.ReplaceAll(filename, "\\", "_")
	filename = strings.ReplaceAll(filename, "..", "_")
	
	// Remove any remaining dangerous characters
	dangerous := []string{"<", ">", ":", "\"", "|", "?", "*"}
	for _, char := range dangerous {
		filename = strings.ReplaceAll(filename, char, "_")
	}
	
	return filename
}

// extractFilenameFromURL extracts filename from a URL
func extractFilenameFromURL(url string) string {
	// Extract filename from URL like: http://localhost:8080/api/v1/files/resumes/filename.pdf
	parts := strings.Split(url, "/")
	if len(parts) > 0 {
		return parts[len(parts)-1]
	}
	return ""
} 