import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';

import { parseFetchPostQueryParams } from '@/libs/server/postUtils/postFetch';
import { authOptions } from '../../auth/[...nextauth]';
import {
  MethodNotAllowedError,
  NotFoundError,
} from '@/libs/server/customErrors';
import { getPostsByUserId } from '@/libs/prisma/post';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';

const parseQuery = (query: any) => {
  const { userId, page, limit } = query;

  return {
    userId: userId ? userId : '',
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  };
};

const allowedMethods = ['GET'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session | null
) {
  const { page, limit, userId } = parseQuery(req.query);

  let posts = await getPostsByUserId(userId, page, limit);

  posts = posts.map((post) => {
    return addIsLikedAndIsCommented(post, session?.user.id);
  });

  return res.status(200).json({ message: 'success', data: posts });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    return handleGET(req, res, session);
  }
}

export default withErrorHandling(handler);
