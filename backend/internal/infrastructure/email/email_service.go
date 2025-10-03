package email

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
	"time"

	"super2025-backend/internal/infrastructure/config"

	"go.uber.org/zap"
)

// EmailService handles sending emails
type EmailService struct {
	config *config.EmailConfig
	logger *zap.Logger
}

// NewEmailService creates a new email service instance
func NewEmailService(cfg *config.Config, logger *zap.Logger) *EmailService {
	emailService := &EmailService{
		config: &cfg.Email,
		logger: logger,
	}

	// Validate email configuration
	if err := emailService.validateConfig(); err != nil {
		logger.Warn("Email service configuration validation failed", zap.Error(err))
		logger.Warn("Email notifications will be disabled until configuration is fixed")
	} else {
		logger.Info("Email service initialized successfully", 
			zap.String("smtp_host", cfg.Email.SMTPHost),
			zap.String("smtp_port", cfg.Email.SMTPPort),
			zap.String("from_email", cfg.Email.FromEmail),
			zap.String("hr_email", cfg.Email.HREmail))
	}

	return emailService
}

// validateConfig validates the email configuration
func (es *EmailService) validateConfig() error {
	if es.config.SMTPHost == "" {
		return fmt.Errorf("SMTP_HOST is required")
	}
	if es.config.SMTPPort == "" {
		return fmt.Errorf("SMTP_PORT is required")
	}
	if es.config.SMTPUsername == "" {
		return fmt.Errorf("SMTP_USERNAME is required")
	}
	if es.config.SMTPPassword == "" {
		return fmt.Errorf("SMTP_PASSWORD is required")
	}
	if es.config.FromEmail == "" {
		return fmt.Errorf("FROM_EMAIL is required")
	}
	return nil
}

// SendApplicationConfirmation sends a thank you email to the candidate
func (es *EmailService) SendApplicationConfirmation(candidateEmail, candidateName, position string) error {
	// Validate configuration before sending
	if err := es.validateConfig(); err != nil {
		es.logger.Error("Email configuration invalid, skipping confirmation email", zap.Error(err))
		return fmt.Errorf("email configuration invalid: %w", err)
	}

	subject := "Thank you for your application to Super 2025"
	
	// Prepare email template data
	data := struct {
		CandidateName string
		Position      string
		CompanyName   string
	}{
		CandidateName: candidateName,
		Position:      position,
		CompanyName:   "Super 2025",
	}

	// Generate HTML email body
	htmlBody, err := es.generateHTMLTemplate(data)
	if err != nil {
		es.logger.Error("Failed to generate HTML template", zap.Error(err))
		return fmt.Errorf("failed to generate email template: %w", err)
	}

	// Send email
	if err := es.sendEmail(candidateEmail, subject, htmlBody); err != nil {
		es.logger.Error("Failed to send confirmation email", 
			zap.String("candidate_email", candidateEmail),
			zap.String("position", position),
			zap.Error(err))
		return fmt.Errorf("failed to send confirmation email: %w", err)
	}

	es.logger.Info("Confirmation email sent successfully", 
		zap.String("candidate_email", candidateEmail),
		zap.String("candidate_name", candidateName),
		zap.String("position", position))

	return nil
}

// SendHRNotification sends notification to HR about new application
// Parameters:
// - candidateEmail: The applicant's email address (for reference in notification)
// - candidateName: The applicant's name
// - position: The position they applied for  
// - resumeURL: Link to the candidate's resume
// Note: The HR recipient email comes from es.config.HREmail
func (es *EmailService) SendHRNotification(candidateEmail, candidateName, position, resumeURL string) error {
	// Validate configuration before sending
	if err := es.validateConfig(); err != nil {
		es.logger.Error("Email configuration invalid, skipping HR notification", zap.Error(err))
		return fmt.Errorf("email configuration invalid: %w", err)
	}

	// Get HR email from configuration (this is WHO we're sending TO)
	hrEmail := es.config.HREmail
	if hrEmail == "" {
		es.logger.Error("HR_EMAIL not configured, cannot send notification")
		return fmt.Errorf("HR_EMAIL not configured")
	}

	subject := fmt.Sprintf("New Job Application: %s for %s", candidateName, position)
	
	es.logger.Info("Preparing HR notification", 
		zap.String("hr_recipient", hrEmail),
		zap.String("candidate_email", candidateEmail),
		zap.String("candidate_name", candidateName),
		zap.String("position", position))

	// Prepare email template data
	data := struct {
		CandidateName  string
		CandidateEmail string
		Position       string
		ResumeURL      string
		CompanyName    string
		CurrentTime    string
	}{
		CandidateName:  candidateName,
		CandidateEmail: candidateEmail,
		Position:       position,
		ResumeURL:      resumeURL,
		CompanyName:    "Super 2025",
		CurrentTime:    time.Now().Format("January 2, 2006 at 3:04 PM"),
	}

	// Generate HTML email body
	htmlBody, err := es.generateHRNotificationTemplate(data)
	if err != nil {
		es.logger.Error("Failed to generate HR notification template", zap.Error(err))
		return fmt.Errorf("failed to generate HR notification template: %w", err)
	}

	// Send email
	if err := es.sendEmail(hrEmail, subject, htmlBody); err != nil {
		es.logger.Error("Failed to send HR notification email", 
			zap.String("hr_email", hrEmail),
			zap.String("candidate_email", candidateEmail),
			zap.String("position", position),
			zap.Error(err))
		return fmt.Errorf("failed to send HR notification email: %w", err)
	}

	es.logger.Info("HR notification email sent successfully", 
		zap.String("hr_email", hrEmail),
		zap.String("candidate_email", candidateEmail),
		zap.String("candidate_name", candidateName),
		zap.String("position", position))

	return nil
}

// sendEmail sends an email using SMTP
func (es *EmailService) sendEmail(to, subject, htmlBody string) error {
	// SMTP authentication
	auth := smtp.PlainAuth("", es.config.SMTPUsername, es.config.SMTPPassword, es.config.SMTPHost)

	// Email headers and body
	msg := []byte("To: " + to + "\r\n" +
		"From: " + es.config.FromEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/html; charset=UTF-8\r\n" +
		"\r\n" + htmlBody)

	// Send email
	smtpAddr := es.config.SMTPHost + ":" + es.config.SMTPPort
	err := smtp.SendMail(smtpAddr, auth, es.config.FromEmail, []string{to}, msg)
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}

// generateHTMLTemplate generates HTML email template for candidate confirmation
func (es *EmailService) generateHTMLTemplate(data struct {
	CandidateName string
	Position      string
	CompanyName   string
}) (string, error) {
	tmpl := `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thank you for your application</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        .logo { font-size: 24px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">{{.CompanyName}}</div>
            <h1>Thank You for Your Application!</h1>
        </div>
        <div class="content">
            <h2>Dear {{.CandidateName}},</h2>
            <p>Thank you for your interest in the <strong>{{.Position}}</strong> position at {{.CompanyName}}.</p>
            <p>We have successfully received your application and our team will review it carefully. If your qualifications match our requirements, we will contact you within the next few business days to discuss the next steps.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
                <li>Our HR team will review your application</li>
                <li>If selected, you'll receive an email to schedule an interview</li>
                <li>We'll keep you updated throughout the process</li>
            </ul>
            <p>Thank you again for considering {{.CompanyName}} as your next career opportunity. We appreciate the time you took to apply.</p>
            <p>Best regards,<br>
            The {{.CompanyName}} Careers Team</p>
        </div>
        <div class="footer">
            <p>© {{.CompanyName}}. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>`

	t, err := template.New("email").Parse(tmpl)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	err = t.Execute(&buf, data)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}

// generateHRNotificationTemplate generates HTML email template for HR notification
func (es *EmailService) generateHRNotificationTemplate(data struct {
	CandidateName  string
	CandidateEmail string
	Position       string
	ResumeURL      string
	CompanyName    string
	CurrentTime    string
}) (string, error) {
	tmpl := `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Job Application</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .info-box { background-color: #e5e7eb; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        .button { background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Job Application Received</h1>
        </div>
        <div class="content">
            <h2>Application Details</h2>
            <div class="info-box">
                <p><strong>Candidate Name:</strong> {{.CandidateName}}</p>
                <p><strong>Email:</strong> {{.CandidateEmail}}</p>
                <p><strong>Position:</strong> {{.Position}}</p>
                <p><strong>Application Date:</strong> {{.CurrentTime}}</p>
            </div>
            <p><strong>Resume:</strong></p>
            <a href="{{.ResumeURL}}" class="button">Download Resume</a>
            <p>Please review the application and update the candidate's status in the system.</p>
        </div>
        <div class="footer">
            <p>© {{.CompanyName}} HR System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`

	t, err := template.New("hr_notification").Parse(tmpl)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	err = t.Execute(&buf, data)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
} 