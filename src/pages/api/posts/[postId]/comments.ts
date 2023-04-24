import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchCommentsByPostId,
  parseFetchCommentsQueryParams,
} from '@/libs/server/commentUtils/commentFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = parseFetchCommentsQueryParams(req.query);
  if (req.method === 'GET') {
    const comments = await fetchCommentsByPostId(postId);

    return res.status(200).json({ message: 'successful', data: comments });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
