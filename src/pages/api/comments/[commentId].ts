import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/prisma';
import { authOptions } from '../auth/[...nextauth]';
import { Session, getServerSession } from 'next-auth';
import {
  ForbiddenError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';

const parseQuery = (query: any) => {
  const { commentId } = query;

  return {
    commentId: commentId ? parseInt(commentId) : -1,
  };
};

const allowedMethods = ['DELETE'];

async function handleDELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  commentId: number
) {
  const comment = await client.comment.findUnique({
    where: { id: commentId },
  });

  // 삭제 할 댓글이 존재하지 않음
  if (!comment) {
    throw new NotFoundError('comment');
  }

  // 댓글을 삭제 할 권한이 없음
  if (comment.userId !== session.user.id) {
    throw new ForbiddenError();
  }

  await client.comment.delete({
    where: { id: commentId },
  });

  return res.status(200).json({ message: 'successful' });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  const { commentId } = parseQuery(req.query);

  // 댓글 삭제
  if (req.method === 'DELETE') {
    if (!session) {
      throw new UnauthorizedError();
    }
    return handleDELETE(req, res, session, commentId);
  }
}

export default withErrorHandling(handler);
