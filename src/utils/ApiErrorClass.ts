import config from '../config/env.js';

class ApiError extends Error {
  success: boolean;
  statusCode: number;
  constructor(statusCode: number, errorMessage: string) {
    super(errorMessage);
    this.success = false;
    this.statusCode = statusCode;

    if (config.NODE_ENV !== 'development') delete this.stack;
  }
}

export default ApiError;
