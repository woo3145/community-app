import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import {
  addIsLikedAndIsCommented,
  fetchPostsByUserId,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }
    const { intPage, intLimit } = parseFetchPostQueryParams(req.query);

    const posts = await fetchPostsByUserId(session.user.id, intPage, intLimit);

    const postsWithIsLiked = posts.map((post) => {
      return addIsLikedAndIsCommented(post, session.user.id);
    });

    return res.status(200).json({ message: 'success', data: postsWithIsLiked });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
