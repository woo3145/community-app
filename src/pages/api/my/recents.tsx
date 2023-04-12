import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

import client from '@/libs/server/prismaClient';

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

    const recents = await client.view.findMany({
      skip: intPage * intLimit,
      take: intLimit,
      where: {
        userId: session.user.id,
      },
      orderBy: {
        viewedAt: 'desc',
      },
      select: {
        viewedAt: true,
        post: {
          include: {
            tags: true,
            user: {
              select: {
                profile: {
                  include: { job: true },
                },
              },
            },
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
            likes: {
              select: {
                userId: true,
              },
            },
            comments: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });
    const recentsWithIsLiked = recents.map((recent) => {
      return {
        ...recent,
        post: {
          ...recent.post,
          isLiked: recent.post.likes.some(
            (liked) => liked.userId === session?.user.id
          ),
          isCommented: recent.post.comments.some(
            (comment) => comment.userId === session?.user.id
          ),
        },
      };
    });
    return res.status(200).json({ recents: recentsWithIsLiked });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
