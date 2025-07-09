#!/bin/bash

echo "🚀 Setting up Super 2025 Backend..."

# Check if .env file exists
if [ ! -f "config.env" ]; then
    echo "📋 Creating config.env from example..."
    cp config.env.example config.env
    echo "⚠️  Please update config.env with your database and email credentials"
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads/resumes

# Check if PostgreSQL is running (optional)
echo "🗄️  Checking database connection..."
go run cmd/server/main.go --check-db

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed. Please check your database configuration."
    echo "Make sure PostgreSQL is running and credentials in config.env are correct."
    exit 1
fi

echo "🎉 Setup complete! You can now run the application with:"
echo "    go run cmd/server/main.go" 