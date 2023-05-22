import { getServerSession } from 'next-auth';
import { deletePostById, getPostById } from '@/libs/prisma/post';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/apiErrors';
import { NextResponse } from 'next/server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface Params {
  params: {
    postId: string;
  };
}

// 게시물 하나 가져오기
export const GET = async (req: Request, { params }: Params) => {
  const { postId } = params;
  const post = await getPostById(parseInt(postId));

  if (!post) {
    return NotFoundError();
  }

  return NextResponse.json({ data: post });
};

// 게시물 삭제
export const DELETE = async (req: Request, { params }: Params) => {
  const { postId } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }

  const post = await getPostById(parseInt(postId));
  if (!post) {
    return NotFoundError();
  }

  if (!post.userId || post.userId !== session.user.id) {
    return ForbiddenError();
  }

  await deletePostById(post.id);

  return NextResponse.json({ message: 'successful' });
};
