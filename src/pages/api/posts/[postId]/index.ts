import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import {
  ForbiddenError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { getPostById } from '@/libs/prisma/post';

const parseQuery = (query: any) => {
  const { postId } = query;

  return {
    postId: postId ? parseInt(postId) : -1,
  };
};

const allowedMethods = ['GET', 'DELETE'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  postId: number
) {
  const post = await getPostById(postId);
  if (!post) {
    throw new NotFoundError('post');
  }

  return res.status(200).json({ message: 'successful', data: post });
}

async function handleDELETE(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  postId: number
) {
  const post = await client.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      userId: true,
    },
  });
  if (!post) {
    throw new NotFoundError('post');
  }

  if (!post.userId || post.userId !== session.user.id) {
    throw new ForbiddenError();
  }

  await client.post.delete({
    where: { id: post.id },
  });

  return res.status(200).json({ message: 'successful' });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  const session = await getServerSession(req, res, authOptions);
  const { postId } = parseQuery(req.query);

  // 게시물 히나 로드
  if (req.method === 'GET') {
    return handleGET(req, res, postId);
  }

  // 게시물 삭제
  if (req.method === 'DELETE') {
    if (!session) {
      throw new UnauthorizedError();
    }
    return handleDELETE(req, res, session, postId);
  }
}

export default withErrorHandling(handler);
