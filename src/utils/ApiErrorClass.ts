import config from '../config/env.js';

class ApiError extends Error {
  success: boolean;
  statusCode: number;
  details?: string;
  constructor(statusCode: number, errorMessage: string, details?: string) {
    super(errorMessage);
    this.success = false;
    this.statusCode = statusCode;

    if (details) {
      this.details = details;
    }

    if (config.NODE_ENV !== 'development') delete this.stack;
  }
}

export default ApiError;
