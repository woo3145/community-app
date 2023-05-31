import { deleteComment, getCommentById } from '@/libs/prisma/comment';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/apiErrors';
import { authOptions } from '@/libs/server/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

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
