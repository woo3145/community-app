import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query as { postId: string };
  if (req.method === 'GET') {
    const comments = await client.comment.findMany({
      where: { postId: parseInt(postId) },
      orderBy: {
        createAt: 'desc',
      },
      include: {
        user: {
          select: {
            profile: {
              include: { job: true },
            },
          },
        },
      },
    });

    return res.status(200).json({ message: 'successful', comments });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
