# Super2025 - Modern Career Platform

A modern, responsive career platform built with Next.js and Go backend, featuring job applications, team showcases, and professional design.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Go 1.19+
- PostgreSQL 14+

### Frontend Setup

1. **Clone and install dependencies:**
```bash
npm install
# or
yarn install
```

2. **Environment Configuration:**
```bash
# Copy the example environment file
cp env.example .env.local

# Edit .env.local with your configuration
```

Required environment variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8080)
- `NEXT_PUBLIC_API_VERSION` - API version (default: v1)
- `NEXT_PUBLIC_MAX_FILE_SIZE` - Max file upload size in bytes (default: 5242880)

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Set up environment:**
```bash
# Copy the example config
cp config.env.example config.env

# Edit config.env with your database credentials
```

3. **Start the backend:**
```bash
# Make the script executable
chmod +x start.sh

# Run the backend
./start.sh
```

The backend will be available at [http://localhost:8080](http://localhost:8080).

## 🛠️ Configuration

### Environment Variables

Frontend (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_APP_NAME=Super2025
```

Backend (`backend/config.env`):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=super2025_careers
PORT=8080
```

## 📁 Project Structure

```
.
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions and config
│   └── data/               # Static data and content
├── backend/                # Go backend
│   ├── cmd/                # Application entry points
│   ├── internal/           # Internal packages
│   └── uploads/            # File uploads directory
└── public/                 # Static assets
```

## 🎯 Features

- **Modern Design**: Professional UI with Framer Motion animations
- **Job Applications**: Complete application workflow with file uploads
- **Team Showcase**: Dynamic team member profiles
- **Responsive**: Mobile-first design approach
- **Type Safety**: Full TypeScript support
- **API Integration**: RESTful API with proper error handling

## 🔧 Development

### Available Scripts

Frontend:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

Backend:
```bash
go run cmd/server/main.go    # Start development server
go build -o super2025        # Build for production
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Go Documentation](https://golang.org/doc/) - Learn about Go programming
- [Framer Motion](https://www.framer.com/motion/) - Animation library documentation

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Backend (Production)

1. Build the Go binary:
```bash
cd backend
go build -o super2025 cmd/server/main.go
```

2. Set up PostgreSQL database
3. Configure environment variables
4. Run the binary

## 📝 API Documentation

### Job Application Endpoint

**POST** `/api/v1/applications`

Form data:
- `fullName` (required) - Applicant's full name
- `email` (required) - Email address
- `phone` (optional) - Phone number
- `position` (required) - Position ID
- `coverLetter` (required) - Cover letter text
- `resume` (required) - Resume file (.pdf, .doc, .docx, max 5MB)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
