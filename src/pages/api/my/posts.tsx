import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import {
  addIsLikedAndIsCommented,
  fetchPostsByUserId,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  if (req.method === 'GET') {
    const { page, limit } = parseFetchPostQueryParams(req.query);

    const posts = await fetchPostsByUserId(session.user.id, page, limit);

    const postsWithIsLiked = posts.map((post) => {
      return addIsLikedAndIsCommented(post, session.user.id);
    });

    return res.status(200).json({ message: 'success', data: postsWithIsLiked });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
