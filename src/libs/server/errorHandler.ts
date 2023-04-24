import { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from './customErrors';

// API 에러 핸들러
export function handleError(error: unknown, res: NextApiResponse) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ errors: error.serializeErrors() });
  } else {
    res.status(500).json({ errors: [{ message: 'Internal server error' }] });
  }
}

export function withErrorHandling(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e) {
      handleError(e, res);
    }
  };
}
