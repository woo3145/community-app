import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { commentId } = req.query as { commentId: string };
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const comment = await client.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      throw new HttpError(404, '댓글을 찾을 수 없습니다.');
    }

    if (comment.userId !== session.user.id) {
      throw new HttpError(403, '댓글을 삭제 할 권한이 없습니다.');
    }

    await client.comment.delete({
      where: { id: parseInt(commentId) },
    });

    return res.status(200).json({ message: 'successful' });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
