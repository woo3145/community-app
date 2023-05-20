import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { getPostsByUserId } from '@/libs/prisma/post';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';

const parseQuery = (query: any) => {
  const { page, limit } = query;

  return {
    page: page ? parseInt(page) : 0,
    limit: limit ? parseInt(limit) : 15,
  };
};

const allowedMethods = ['GET'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const { page, limit } = parseQuery(req.query);

  const posts = await getPostsByUserId(session.user.id, page, limit);
  const postsWithIsLiked = posts.map((post) =>
    addIsLikedAndIsCommented(post, session.user.id)
  );

  return res.status(200).json({ data: postsWithIsLiked });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  // 내가 쓴 글 불러오기(pagination)
  if (req.method === 'GET') {
    return handleGET(req, res, session);
  }
}

export default withErrorHandling(handler);
