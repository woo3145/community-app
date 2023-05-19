interface ApiError {
  message: string;
  field?: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  statusCode: number;
}
