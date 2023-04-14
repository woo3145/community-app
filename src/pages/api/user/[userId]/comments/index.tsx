import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/prismaClient';

const parseQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const { userId: _userId } = query as {
    userId: string;
  };
  const userId = _userId;

  return { userId };
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = parseQueryParams(req.query);
    const comments = await client.comment.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({ message: 'success', comments });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
