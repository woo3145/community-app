import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import client from '@/libs/server/prismaClient';
import {
  addIsLikedAndIsCommented,
  getPostInclude,
} from '@/libs/server/postUtils/postFetch';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  if (req.method === 'GET') {
    const { page, limit } = req.query as {
      page: string | undefined;
      limit: string | undefined;
    };
    const intPage = page !== undefined ? parseInt(page) : 0;
    const intLimit = limit !== undefined ? parseInt(limit) : 15;

    const likes = await client.likedPost.findMany({
      skip: intPage * intLimit,
      take: intLimit,
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
        post: {
          include: getPostInclude(),
        },
      },
    });

    const likesPostWithIsLiked = likes.map((like) => {
      return {
        ...like,
        post: addIsLikedAndIsCommented(like.post, session.user.id),
      };
    });

    return res
      .status(200)
      .json({ message: 'success', data: likesPostWithIsLiked });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
