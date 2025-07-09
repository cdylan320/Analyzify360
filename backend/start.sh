#!/bin/bash

echo "Starting Go Q&A Backend..."


# Start PostgreSQL if not running
echo "Checking PostgreSQL..."
if ! pg_isready -q; then
    echo "Starting PostgreSQL..."
    pg_ctl start -D /usr/local/var/postgres
fi

# Start the server
echo "Starting server on port 8080..."
go run cmd/server/main.go
