import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import { authOptions } from '../auth/[...nextauth]';
import { Session, getServerSession } from 'next-auth';
import { CreatePostBody, createPost } from '@/libs/server/postUtils/postHelper';
import {
  MethodNotAllowedError,
  UnauthorizedError,
  ValidationError,
} from '@/libs/server/customErrors';
import { getPostsByTagId } from '@/libs/prisma/post';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';

const parseQuery = (query: any) => {
  const { tag_id, page, limit, postId } = query;

  return {
    tagId: tag_id ? parseInt(tag_id) : -1,
    page: page ? parseInt(page) : 0,
    limit: limit ? parseInt(limit) : 15,
    postId: postId ? parseInt(postId) : -1,
  };
};

const allowedMethods = ['GET', 'POST'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session | null
) {
  const { tagId, page, limit } = parseQuery(req.query);

  const posts = await getPostsByTagId(tagId, page, limit);
  const postsWithIsLiked = posts.map((post) =>
    addIsLikedAndIsCommented(post, session?.user.id)
  );

  return res.status(200).json({ data: postsWithIsLiked });
}

async function handlePOST(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const { title, content, published, tags, imageUrl } =
    req.body as CreatePostBody;

  const errors: { field: string; message: string }[] = [];

  if (tags.length === 0 || 3 < tags.length) {
    errors.push({ field: 'tags', message: '태그의 수가 잘못되었습니다.' });
  }
  if (!title) {
    errors.push({ field: 'title', message: '제목을 입력해 주세요.' });
  }
  if (!content) {
    errors.push({ field: 'content', message: '내용을 입력해 주세요.' });
  }

  if (errors.length !== 0) {
    throw new ValidationError(errors);
  }

  const newPost = await createPost(session.user.id, {
    title,
    content,
    published,
    tags,
    imageUrl,
  });
  return res.status(200).json({ message: 'successful', data: newPost.id });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  const session = await getServerSession(req, res, authOptions);

  // 게시물 목록 로드
  if (req.method === 'GET') {
    return handleGET(req, res, session);
  }

  // 게시물 생성
  if (req.method === 'POST') {
    if (!session) {
      throw new UnauthorizedError();
    }
    return handlePOST(req, res, session);
  }
}

export default withErrorHandling(handler);
