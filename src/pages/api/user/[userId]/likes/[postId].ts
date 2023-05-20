import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/prismaClient';
import { MethodNotAllowedError } from '@/libs/server/customErrors';

const parseQuery = (query: any) => {
  const { userId, postId } = query;

  return {
    userId: userId ? userId : '',
    postId: postId ? parseInt(postId) : -1,
  };
};

const allowedMethods = ['GET'];

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { userId, postId } = parseQuery(req.query);
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  // 유저가 게시글에 좋아요를 눌렀는지 여부
  if (req.method === 'GET') {
    return handleGET(req, res);
  }
}

export default withErrorHandling(handler);
