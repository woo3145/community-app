import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  MethodNotAllowedError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { getCommentsByUserId } from '@/libs/prisma/comment';

const parseQuery = (query: any) => {
  const { page, limit } = query;

  return {
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  };
};

const allowedMethods = ['GET'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const { page, limit } = parseQuery(req.query);

  if (req.method === 'GET') {
    const comments = await getCommentsByUserId(session.user.id, page, limit);

    return res.status(200).json({ message: 'success', data: comments });
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  // 내 댓글들 불러오기(pagination)
  if (req.method === 'GET') {
    return handleGET(req, res, session);
  }
}

export default withErrorHandling(handler);
