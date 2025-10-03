/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 */

// Validate required environment variables
const requiredEnvVars = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION,
} as const;

// Check for missing required environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.warn(
    `⚠️  Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
}

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  get FULL_URL() {
    return `${this.BASE_URL}/api/${this.VERSION}`;
  },
  ENDPOINTS: {
    APPLICATIONS: '/applications',
    HEALTH: '/health',
    FILES: '/files',
  },
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Super2025',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  ENVIRONMENT: process.env.NEXT_PUBLIC_APP_ENVIRONMENT || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'), // 5MB
  ALLOWED_TYPES: process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES?.split(',') || [
    '.pdf',
    '.doc',
    '.docx',
  ],
  MAX_SIZE_MB: Math.round(
    parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880') / 1024 / 1024
  ),
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
} as const;

// Company Information
export const COMPANY_CONFIG = {
  EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'careers@super2025.com',
  PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1-800-SUPER25',
} as const;

// Type definitions for better TypeScript support
export type ApiEndpoint = keyof typeof API_CONFIG.ENDPOINTS;
export type Environment = typeof APP_CONFIG.ENVIRONMENT;

// Helper functions
export const getApiUrl = (endpoint: ApiEndpoint): string => {
  return `${API_CONFIG.FULL_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};

export const isValidFileType = (fileName: string): boolean => {
  const extension = '.' + fileName.split('.').pop()?.toLowerCase();
  return FILE_CONFIG.ALLOWED_TYPES.includes(extension);
};

export const isValidFileSize = (size: number): boolean => {
  return size <= FILE_CONFIG.MAX_SIZE;
};

// Debug logging in development
if (APP_CONFIG.IS_DEVELOPMENT && FEATURE_FLAGS.ENABLE_DEBUG) {
  console.log('🔧 Environment Configuration:', {
    API_URL: API_CONFIG.FULL_URL,
    ENVIRONMENT: APP_CONFIG.ENVIRONMENT,
    VERSION: APP_CONFIG.VERSION,
  });
} 