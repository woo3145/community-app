import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import client from '@/libs/server/prismaClient';
import { getPostInclude } from '@/libs/server/postUtils/postFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }
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
        post: {
          ...like.post,
          isLiked: true,
        },
      };
    });

    return res.status(200).json({ likes: likesPostWithIsLiked });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
