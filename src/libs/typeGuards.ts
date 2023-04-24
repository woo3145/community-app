export function isErrorResponse(
  error: any
): error is { response: { data: ApiErrorResponse; status: number } } {
  return (
    error &&
    error.response &&
    typeof error.response.data === 'object' &&
    'errors' in error.response.data
  );
}
