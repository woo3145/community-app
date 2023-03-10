import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

interface UpdatePostBody {
  title?: string;
  content?: string;
  published?: boolean;
  tags?: any; // 임시
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query as { postId: string };
  if (req.method === 'GET') {
    const post = await client.post.findUnique({
      where: { id: parseInt(postId) },
      include: {
        tags: true,
      },
    });

    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }
    return res.status(200).json({ message: 'successful', post });
  }

  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const post = await client.post.findUnique({
      where: { id: parseInt(postId) },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    if (post.user && post.user.email !== session.user?.email) {
      throw new HttpError(403, 'Forbidden');
    }

    const { title, content, published, tags } = req.body as UpdatePostBody;

    let isChanged = false;
    const updatedPost = {
      title: post.title,
      content: post.content,
      published: post.published,
    };
    if (title && post.title !== title) {
      isChanged = true;
      updatedPost.title = title;
    }
    if (content && post.content !== content) {
      isChanged = true;
      updatedPost.content = content;
    }
    if (published !== undefined && post.published !== published) {
      isChanged = true;
      updatedPost.published = published === true ? true : false;
    }

    if (!isChanged) {
      throw new HttpError(400, '변경 할 내용이 없습니다.');
    }

    const newPost = await client.post.update({
      where: { id: post.id },
      data: updatedPost,
    });

    return res.status(200).json({ message: 'successful', post: newPost });
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const post = await client.post.findUnique({
      where: { id: parseInt(postId) },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    if (post.user && post.user.email !== session.user?.email) {
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
