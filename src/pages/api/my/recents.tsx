import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import client from '@/libs/server/prismaClient';
import {
  addIsLikedAndIsCommented,
  getPostInclude,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }
    const { page, limit } = parseFetchPostQueryParams(req.query);

    const recents = await client.view.findMany({
      skip: page * limit,
      take: limit,
      where: {
        userId: session.user.id,
      },
      orderBy: {
        viewedAt: 'desc',
      },
      select: {
        viewedAt: true,
        post: {
          include: getPostInclude(),
        },
      },
    });
    const recentsWithIsLiked = recents.map((recent) => {
      return {
        ...recent,
        post: addIsLikedAndIsCommented(recent.post, session.user.id),
      };
    });
    return res
      .status(200)
      .json({ message: 'success', data: recentsWithIsLiked });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
