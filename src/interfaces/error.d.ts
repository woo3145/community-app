interface ClientError {
  message: string;
  field?: string;
}

interface ApiErrorResponse {
  errors: ClientError[];
  statusCode: number;
}
