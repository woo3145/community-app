import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import {
  fetchPost,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import { UpdatePostBody, updatePost } from '@/libs/server/postUtils/postHelper';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { postId } = parseFetchPostQueryParams(req.query);
  // 게시물 목록 로드
  if (req.method === 'GET') {
    const post = await fetchPost(postId);

    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    return res.status(200).json({ message: 'successful', post });
  }

  // 게시물 업데이트
  if (req.method === 'PUT') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const post = await fetchPost(postId);
    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    if (!post.userId || post.userId !== session.user.id) {
      throw new HttpError(403, 'Forbidden');
    }
    const { title, content, published, tags } = req.body as UpdatePostBody;

    if (tags && 3 < tags.length) {
      throw new HttpError(400, '태그의 갯수가 잘못되었습니다.');
    }
    await updatePost(post, { title, content, published, tags });

    return res.status(200).json({ message: 'successful' });
  }

  // 게시물 삭제
  if (req.method === 'DELETE') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const post = await client.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        userId: true,
      },
    });
    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    if (!post.userId || post.userId !== session.user.id) {
      throw new HttpError(403, 'Forbidden');
    }

    await client.post.delete({
      where: { id: post.id },
    });

    return res.status(200).json({ message: 'successful' });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
