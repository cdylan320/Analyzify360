/**
 * Application Configuration
 * Centralized configuration for environment variables and API endpoints
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  get APPLICATIONS_ENDPOINT() {
    return `${this.BASE_URL}/api/${this.VERSION}/applications`;
  },
  get HEALTH_ENDPOINT() {
    return `${this.BASE_URL}/api/${this.VERSION}/health`;
  },
  get FILES_ENDPOINT() {
    return `${this.BASE_URL}/api/${this.VERSION}/files`;
  },
} as const;

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'), // 5MB
  ALLOWED_TYPES: ['.pdf', '.doc', '.docx'],
  MAX_SIZE_MB: 5,
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Super2025',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
} as const;

// Validation helpers
export const validateFile = (file: File) => {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  if (!FILE_CONFIG.ALLOWED_TYPES.includes(extension as any)) {
    throw new Error(`Invalid file type. Allowed types: ${FILE_CONFIG.ALLOWED_TYPES.join(', ')}`);
  }
  
  if (file.size > FILE_CONFIG.MAX_SIZE) {
    throw new Error(`File size too large. Maximum size: ${FILE_CONFIG.MAX_SIZE_MB}MB`);
  }
  
  return true;
}; 