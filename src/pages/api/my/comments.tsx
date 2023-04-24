import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  fetchCommentsByUserId,
  parseFetchCommentsQueryParams,
} from '@/libs/server/commentUtils/commentFetch';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  if (req.method === 'GET') {
    const { page, limit } = parseFetchCommentsQueryParams(req.query);

    const comments = await fetchCommentsByUserId(session.user.id, page, limit);

    return res.status(200).json({ message: 'success', data: comments });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
