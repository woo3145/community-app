import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedError } from '@/libs/server/customErrors';
import { getCommentsByUserId } from '@/libs/prisma/comment';

const parseQuery = (query: any) => {
  const { userId, page, limit } = query;

  return {
    userId: userId ? userId : '',
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  };
};

const allowedMethods = ['GET'];

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { userId, page, limit } = parseQuery(req.query);
  const comments = await getCommentsByUserId(userId, page, limit);

  return res.status(200).json({ message: 'success', data: comments });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  // 유저가 쓴 댓글 목록 불러오기
  if (req.method === 'GET') {
    return handleGET(req, res);
  }
}

export default withErrorHandling(handler);
