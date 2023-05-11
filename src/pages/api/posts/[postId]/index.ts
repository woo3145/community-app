import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import {
  fetchPost,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { postId } = parseFetchPostQueryParams(req.query);
  // 게시물 목록 로드
  if (req.method === 'GET') {
    const post = await fetchPost(postId);
    if (!post) {
      throw new NotFoundError('post');
    }

    return res.status(200).json({ message: 'successful', data: post });
  }

  // 게시물 삭제
  if (req.method === 'DELETE') {
    if (!session) {
      throw new UnauthorizedError();
    }

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

  throw new NotFoundError();
}

export default withErrorHandling(handler);
