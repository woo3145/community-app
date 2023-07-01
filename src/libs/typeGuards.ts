import { z } from 'zod';
import { CustomError } from './server/customErrors';

export const isZodError = (error: unknown): error is z.ZodError => {
  return error instanceof z.ZodError;
};

export const isCustomError = (error: unknown): error is CustomError => {
  return error instanceof CustomError;
};

// 서버에선 errorHandler에서 {message: string, statusCode: number} 로 에러를 발생시킴
export const isServerError = (
  error: unknown
): error is { statusCode: number; message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'statusCode' in error
  );
};

// 클라이언트에선 throw new Error("에러 메세지") 로 에러를 발생시킴
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
