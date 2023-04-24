import { HttpError } from '../server/errorHandling';

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof HttpError;
};
