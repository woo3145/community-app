import { NextApiRequest, NextApiResponse } from 'next';

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export function handleError(error: unknown, res: NextApiResponse) {
  if (error instanceof HttpError) {
    res.status(error.status).json({ ok: false, message: error.message });
  } else {
    res.status(500).json({ ok: false, message: 'Internal server error' });
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
