import { deleteComment, getCommentById } from '@/libs/prisma/comment';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/apiErrors';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const parseQuery = (query: any) => {
  const { userId, page, limit } = query;

  return {
    userId: userId ? userId : '',
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
  };
};

interface Params {
  params: {
    commentId: string;
  };
}

export const DELETE = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }

  const { commentId } = params;
  const comment = await getCommentById(parseInt(commentId));
  if (!comment) {
    return NotFoundError();
  }

  if (!comment.userId || comment.userId !== session.user.id) {
    return ForbiddenError();
  }

  await deleteComment(comment.id);

  return NextResponse.json({ message: 'successful' });
};
