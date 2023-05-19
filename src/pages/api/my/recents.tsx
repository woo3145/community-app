import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  MethodNotAllowedError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { getRecentlyViewedPostsByUserId } from '@/libs/prisma/post';

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

  const views = await getRecentlyViewedPostsByUserId(
    session.user.id,
    page,
    limit
  );
  const recentlyViewedPostsWithIsLiked = views.map((view) => {
    return {
      ...view,
      post: addIsLikedAndIsCommented(view.post, session.user.id),
    };
  });
  return res
    .status(200)
    .json({ message: 'success', data: recentlyViewedPostsWithIsLiked });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  // 내가 최근 본 글 불러오기(pagination)
  if (req.method === 'GET') {
    return handleGET(req, res, session);
  }
}

export default withErrorHandling(handler);
