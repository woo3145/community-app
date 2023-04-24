import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  fetchCommentsByUserId,
  parseFetchCommentsQueryParams,
} from '@/libs/server/commentUtils/commentFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }
    const { page, limit } = parseFetchCommentsQueryParams(req.query);

    const comments = await fetchCommentsByUserId(session.user.id, page, limit);

    return res.status(200).json({ message: 'success', data: comments });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
