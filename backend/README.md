# Super2025 Career Backend

A professional Go backend API for managing job applications with PostgreSQL database, file uploads, and email notifications.

## Architecture

This backend follows Clean Architecture principles with the following layers:

- **Domain Layer**: Business entities, interfaces, and business rules
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: Database, file storage, and external services
- **Presentation Layer**: HTTP handlers, routes, and middleware

## Features

- 🚀 RESTful API for job applications
- 📁 Resume file upload with validation
- 📧 Email notifications (confirmation & HR alerts)
- 🔍 Advanced filtering and pagination
- 📊 Application status management
- 🔒 Security middleware and CORS
- 📝 Comprehensive logging
- 🐘 PostgreSQL with migrations
- ☁️ AWS S3 integration (optional)

## Prerequisites

- Go 1.21 or higher
- PostgreSQL 13 or higher
- (Optional) AWS account for S3 storage

## Quick Start

### 1. Database Setup

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE super2025_careers;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE super2025_careers TO your_username;
\q
```

### 2. Environment Configuration

```bash
# Copy environment template
cp config.env.example .env

# Edit configuration
nano .env
```

### 3. Install Dependencies

```bash
# Initialize Go module
go mod init super2025-backend
go mod tidy

# Install dependencies
go get github.com/gin-gonic/gin
go get github.com/gin-contrib/cors
go get gorm.io/gorm
go get gorm.io/driver/postgres
go get github.com/joho/godotenv
go get github.com/google/uuid
go get go.uber.org/zap
# ... (see go.mod for complete list)
```

### 4. Run the Application

```bash
# Development mode
go run cmd/server/main.go

# Build and run
go build -o bin/server cmd/server/main.go
./bin/server
```

## API Endpoints

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/v1/applications` | Create new application |
| GET    | `/api/v1/applications` | List applications with filters |
| GET    | `/api/v1/applications/:id` | Get application by ID |
| PUT    | `/api/v1/applications/:id/status` | Update application status |
| DELETE | `/api/v1/applications/:id` | Delete application |
| GET    | `/api/v1/applications/:id/resume` | Get resume download URL |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Health check |

## Request Examples

### Create Application

```bash
curl -X POST http://localhost:8080/api/v1/applications \
  -H "Content-Type: multipart/form-data" \
  -F "position_id=senior-ai-engineer" \
  -F "name=John Doe" \
  -F "email=john.doe@example.com" \
  -F "phone=+1234567890" \
  -F "cover_letter=I am excited to apply for this position..." \
  -F "resume=@/path/to/resume.pdf"
```

### List Applications

```bash
curl "http://localhost:8080/api/v1/applications?page=1&page_size=20&status=pending&sort_by=created_at&sort_order=desc"
```

### Update Status

```bash
curl -X PUT http://localhost:8080/api/v1/applications/123e4567-e89b-12d3-a456-426614174000/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "reviewing",
    "processed_by": "hr@super2025.com",
    "notes": "Candidate has strong background"
  }'
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `super2025_careers` |
| `PORT` | Server port | `8080` |
| `UPLOAD_DIR` | Local upload directory | `./uploads/resumes` |
| `MAX_FILE_SIZE` | Max file size in bytes | `5242880` (5MB) |

### File Storage Options

#### Local Storage (Default)
```env
UPLOAD_DIR=./uploads/resumes
```

#### AWS S3 Storage
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=super2025-resumes
```

## Database Schema

```sql
CREATE TABLE applications (
    id UUID PRIMARY KEY,
    position_id VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    cover_letter TEXT NOT NULL,
    resume_url VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    ip_address INET,
    user_agent TEXT,
    source VARCHAR(100) DEFAULT 'website',
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Frontend Integration

Update your frontend to use this API:

```typescript
// Update the form submission in careers page
const handleSubmitApplication = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData();
  formData.append('position_id', selectedPosition.id);
  formData.append('name', applicationData.name);
  formData.append('email', applicationData.email);
  formData.append('phone', applicationData.phone);
  formData.append('cover_letter', applicationData.coverLetter);
  formData.append('resume', applicationData.resume);

  try {
    const response = await fetch('http://localhost:8080/api/v1/applications', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Application submitted:', result);
      // Handle success
    } else {
      // Handle error
      const error = await response.json();
      console.error('Application failed:', error);
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

## Testing

```bash
# Run tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run specific test
go test ./internal/application/services -v
```

## Deployment

### Docker

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

### Production Checklist

- [ ] Set `GIN_MODE=release`
- [ ] Configure PostgreSQL with SSL
- [ ] Set up AWS S3 for file storage
- [ ] Configure SMTP for email notifications
- [ ] Set up monitoring and logging
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL certificates

## Security

- File upload validation (PDF, DOC, DOCX only)
- File size limits (5MB max)
- CORS protection
- Request ID tracking
- SQL injection prevention
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License. 