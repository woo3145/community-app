import { createComment, getCommentsByPostId } from '@/libs/prisma/comment';
import { CreateCommentBody } from '@/interfaces/api';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@/libs/server/apiErrors';
import { getPostById } from '@/libs/prisma/post';

interface Params {
  params: {
    postId: string;
  };
}

export const GET = async (req: Request, { params }: Params) => {
  const { postId } = params;
  const comments = await getCommentsByPostId(parseInt(postId));

  return NextResponse.json({ data: comments });
};

export const POST = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }

  const { postId } = params;
  const { content }: CreateCommentBody = await req.json();

  const post = await getPostById(parseInt(postId));
  if (!post) {
    return NotFoundError();
  }

  if (!content) {
    return ValidationError();
  }
  const newComment = await createComment(session.user.id, post.id, content);

  return NextResponse.json({ data: newComment });
};
