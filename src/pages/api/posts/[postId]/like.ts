import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

interface LikePostBody {
  isLiked: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const { postId } = req.query as { postId: string };

  if (req.method === 'GET') {
    const likeCount = await client.likedPost.count({
      where: { postId: parseInt(postId) },
    });
    return res.status(200).json({ message: 'successful', data: likeCount });
  }

  if (req.method === 'PUT') {
    if (!session) {
      throw new UnauthorizedError();
    }

    const { isLiked } = req.body as LikePostBody;

    const like = await client.likedPost.findFirst({
      where: {
        userId: session.user.id,
        postId: parseInt(postId),
      },
    });
    if (isLiked && like) {
      await client.likedPost.delete({
        where: {
          id: like.id,
        },
      });
    } else if (!isLiked && !like) {
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
    }

    return res.status(200).json({ message: 'successful' });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
