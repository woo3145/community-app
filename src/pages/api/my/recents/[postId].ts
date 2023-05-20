import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  MethodNotAllowedError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { updatePostViewed } from '@/libs/prisma/post';

const parseQuery = (query: any) => {
  const { postId } = query;

  return {
    postId: postId ? parseInt(postId) : -1,
  };
};

const allowedMethods = ['PUT'];

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const { postId } = parseQuery(req.query);
  await updatePostViewed(session.user.id, postId);
  return res.status(200).json({ message: 'success' });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  // 유저가 최근 본 글 저장
  if (req.method === 'PUT') {
    return handlePUT(req, res, session);
  }
}

export default withErrorHandling(handler);
