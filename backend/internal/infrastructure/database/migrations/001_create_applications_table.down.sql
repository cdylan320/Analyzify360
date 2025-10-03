-- Drop trigger
DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop indexes
DROP INDEX IF EXISTS idx_applications_email_position;
DROP INDEX IF EXISTS idx_applications_created_at;
DROP INDEX IF EXISTS idx_applications_status;
DROP INDEX IF EXISTS idx_applications_email;
DROP INDEX IF EXISTS idx_applications_position_id;

-- Drop table
DROP TABLE IF EXISTS applications; 