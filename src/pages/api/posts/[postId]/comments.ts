import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchCommentsByPostId,
  parseFetchCommentsQueryParams,
} from '@/libs/server/commentUtils/commentFetch';
import { NotFoundError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = parseFetchCommentsQueryParams(req.query);
  if (req.method === 'GET') {
    const comments = await fetchCommentsByPostId(postId);

    return res.status(200).json({ message: 'successful', data: comments });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
