class ApiResponse {
  success: true;
  message: string;
  data: unknown;
  constructor(payload: unknown, message: string) {
    this.success = true;
    this.message = message;
    this.data = payload;
  }
}

export default ApiResponse;
