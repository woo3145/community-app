export const isServerError = (error: unknown): error is ApiErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'errors' in error &&
    Array.isArray(error.errors) &&
    error.errors.every((item) => 'message' in item)
  );
};

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
