import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

interface UpdatePostBody {
  title?: string;
  content?: string;
  published?: boolean;
  tags?: any; // 임시
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query as { postId: string };
  if (req.method === 'GET') {
    const comments = await client.comment.findMany({
      where: { postId: parseInt(postId) },
    });

    return res.status(200).json({ message: 'successful', comments });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
