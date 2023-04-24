import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/prismaClient';
import { NotFoundError } from '@/libs/server/customErrors';

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
      .json({ message: 'success', data: post ? true : false });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
