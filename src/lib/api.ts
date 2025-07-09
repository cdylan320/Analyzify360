/**
 * API Service Layer
 * Centralized API calls with proper error handling
 */

import { API_CONFIG, validateFile } from './config';

// Types
export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
  resume: File;
}

export interface ApplicationResponse {
  id: string;
  position_id: string;
  name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Service
export class ApiService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let errorData;

      try {
        errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
      }

      throw new ApiError(errorMessage, response.status, errorData?.code);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new ApiError('Invalid response format');
    }
  }

  /**
   * Submit job application
   */
  static async submitApplication(data: ApplicationData): Promise<ApplicationResponse> {
    // Validate input
    if (!data.name.trim() || !data.email.trim() || !data.coverLetter.trim()) {
      throw new ApiError('Please fill in all required fields');
    }

    if (!data.resume) {
      throw new ApiError('Please upload your resume');
    }

    // Validate file
    validateFile(data.resume);

    // Prepare form data
    const formData = new FormData();
    formData.append('fullName', data.name.trim());
    formData.append('email', data.email.trim());
    formData.append('phone', data.phone.trim());
    formData.append('position', data.position);
    formData.append('coverLetter', data.coverLetter.trim());
    formData.append('resume', data.resume);

    try {
      const response = await fetch(API_CONFIG.APPLICATIONS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      return await this.handleResponse<ApplicationResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error. Please check your connection and try again.');
    }
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(API_CONFIG.HEALTH_ENDPOINT);
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Backend service is unavailable');
    }
  }
} 