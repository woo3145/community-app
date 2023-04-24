interface ClientError {
  message: string;
  field?: string;
}

interface ErrorResponse {
  errors: ClientError[];
}
