import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import {
  fetchPost,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import { UpdatePostBody, updatePost } from '@/libs/server/postUtils/postHelper';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
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

  // 게시물 업데이트
  if (req.method === 'PUT') {
    if (!session) {
      throw new UnauthorizedError();
    }

    const post = await fetchPost(postId);
    if (!post) {
      throw new NotFoundError('post');
    }

    if (!post.userId || post.userId !== session.user.id) {
      throw new ForbiddenError();
    }
    const { title, content, published, tags } = req.body as UpdatePostBody;

    if (tags && 3 < tags.length) {
      throw new ValidationError([
        { field: 'tags', message: '태그는 3개 미만이어야 합니다.' },
      ]);
    }
    await updatePost(post, { title, content, published, tags });

    return res.status(200).json({ message: 'successful' });
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
