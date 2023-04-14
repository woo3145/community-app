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

  const { postId } = req.query as { postId: string };

  if (req.method === 'GET') {
    const likeCount = await client.likedPost.count({
      where: { postId: parseInt(postId) },
    });
    return res
      .status(200)
      .json({ message: 'successful', likeCount: likeCount });
  }
  if (req.method === 'PUT') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { isLiked } = req.body as LikePostBody;

    const like = await client.likedPost.findFirst({
      where: {
        userId: session.user.id,
        postId: parseInt(postId),
      },
    });
    let result = false;
    if (isLiked && like) {
      await client.likedPost.delete({
        where: {
          id: like.id,
        },
      });
      result = false;
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
      result = true;
    }

    return res.status(200).json({ message: 'successful', isLiked: result });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
