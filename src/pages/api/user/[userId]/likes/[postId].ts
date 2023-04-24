import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/prismaClient';

const parseQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const { userId: _userId, postId: _postId } = query as {
    userId: string;
    postId: string;
  };
  const userId = _userId;
  const postId = parseInt(_postId);

  return { userId, postId };
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, postId } = parseQueryParams(req.query);
    const post = await client.likedPost.findFirst({
      where: {
        userId,
        postId,
      },
    });

    return res
      .status(200)
      .json({ message: 'success', isLiked: post ? true : false });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
