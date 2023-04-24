import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import {
  addIsLikedAndIsCommented,
  fetchPostsByUserId,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import { authOptions } from '../../auth/[...nextauth]';
import { NotFoundError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const { page, limit, userId } = parseFetchPostQueryParams(req.query);

    let posts = await fetchPostsByUserId(userId, page, limit);

    if (session && session.user) {
      posts = posts.map((post) => {
        return addIsLikedAndIsCommented(post, session.user.id);
      });
    }

    return res.status(200).json({ message: 'success', data: posts });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
