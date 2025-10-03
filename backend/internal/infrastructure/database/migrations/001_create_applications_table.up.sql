-- Create applications table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position_id VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    cover_letter TEXT NOT NULL,
    resume_url VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL 
        CHECK (status IN ('pending', 'reviewing', 'interview', 'offered', 'rejected', 'withdrawn')),
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    source VARCHAR(100) DEFAULT 'website',
    
    -- Processing info
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by VARCHAR(255),
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_applications_position_id ON applications(position_id);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at);
CREATE UNIQUE INDEX idx_applications_email_position ON applications(email, position_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_applications_updated_at 
    BEFORE UPDATE ON applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 