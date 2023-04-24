import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  fetchCommentsByUserId,
  parseFetchCommentsQueryParams,
} from '@/libs/server/commentUtils/commentFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, page, limit } = parseFetchCommentsQueryParams(req.query);
    const comments = await fetchCommentsByUserId(userId, page, limit);

    return res.status(200).json({ message: 'success', data: comments });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
