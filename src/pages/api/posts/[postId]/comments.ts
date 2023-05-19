import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  MethodNotAllowedError,
  UnauthorizedError,
  ValidationError,
} from '@/libs/server/customErrors';
import { createComment, getCommentsByPostId } from '@/libs/prisma/comment';
import { CreateCommentBody } from '@/interfaces/api';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

const parseQuery = (query: any) => {
  const { postId } = query;

  return {
    postId: postId ? parseInt(postId) : -1,
  };
};

const allowedMethods = ['GET', 'POST'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  postId: number
) {
  const comments = await getCommentsByPostId(postId);

  return res.status(200).json({ message: 'successful', data: comments });
}

async function handlePOST(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  postId: number
) {
  const { content } = req.body as CreateCommentBody;

  const errors: ApiError[] = [];

  if (!content) {
    errors.push({ field: 'content', message: '내용이 없습니다.' });
  }

  if (errors.length !== 0) {
    throw new ValidationError(errors);
  }

  const newComment = await createComment(session.user.id, postId, content);

  return res.status(200).json({ message: 'successful', data: newComment });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  const { postId } = parseQuery(req.query);

  // 게시글 댓글 목록 가져오기
  if (req.method === 'GET') {
    return handleGET(req, res, postId);
  }

  // 댓글 생성
  if (req.method === 'POST') {
    if (!session) {
      throw new UnauthorizedError();
    }
    return handlePOST(req, res, session, postId);
  }
}

export default withErrorHandling(handler);
