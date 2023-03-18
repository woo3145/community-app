import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

interface LikePostBody {
  isLiked: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === 'GET') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { postId } = req.query as { postId: string };
    const like = await client.likedPost.findFirst({
      where: {
        userId: session.user.id,
        postId: parseInt(postId),
      },
    });

    return res.status(200).json({ message: 'successful', isLiked: !!like });
  }
  if (req.method === 'PUT') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { isLiked } = req.body as LikePostBody;
    const { postId } = req.query as { postId: string };

    const like = await client.likedPost.findFirst({
      where: {
        userId: session.user.id,
        postId: parseInt(postId),
      },
    });

    if (isLiked) {
      if (like) {
        await client.likedPost.delete({
          where: {
            id: like.id,
          },
        });

        return res.status(200).json({ message: 'successful', isLiked: false });
      }
    } else {
      if (!like) {
        const newLike = await client.likedPost.create({
          data: {
            user: {
              connect: { id: session.user.id },
            },
            post: {
              connect: { id: parseInt(postId) },
            },
          },
        });

        await client.post.update({
          where: { id: parseInt(postId) },
          data: {
            likes: {
              connect: { id: newLike.id },
            },
          },
        });

        return res.status(200).json({ message: 'successful', isLiked: true });
      }
    }
    return res.status(200).json({ message: 'successful', isLiked });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
