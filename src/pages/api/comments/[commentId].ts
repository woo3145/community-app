import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { commentId } = req.query as { commentId: string };
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new UnauthorizedError();
    }

    const comment = await client.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      throw new NotFoundError('comment');
    }

    if (comment.userId !== session.user.id) {
      throw new ForbiddenError();
    }

    await client.comment.delete({
      where: { id: parseInt(commentId) },
    });

    return res.status(200).json({ message: 'successful' });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
