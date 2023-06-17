import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import { deletePostById, getPostById } from '@/libs/prisma/post';
import { authOptions } from '@/libs/server/auth';
import { withErrorHandling } from '@/libs/server/errorHandler';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';

const ParamsSchema = z.object({
  params: z.object({
    postId: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'Must be a valid string representation of a number',
      })
      .transform((value) => Number(value)),
  }),
});

type Params = z.infer<typeof ParamsSchema>;

// 게시물 하나 가져오기
const _GET = async (req: Request, params: Params) => {
  const {
    params: { postId },
  } = ParamsSchema.parse(params);
  const post = await getPostById(postId);

  if (!post) {
    throw new NotFoundError();
  }

  return NextResponse.json({ data: post });
};

// 게시물 삭제
const _DELETE = async (req: Request, params: Params) => {
  const {
    params: { postId },
  } = ParamsSchema.parse(params);

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  const post = await getPostById(postId);
  if (!post) {
    throw new NotFoundError('post');
  }

  if (!post.userId || post.userId !== session.user.id) {
    throw new ForbiddenError();
  }

  await deletePostById(post.id);

  return NextResponse.json({ message: 'successful' });
};

export const GET = withErrorHandling(_GET);
export const DELETE = withErrorHandling(_DELETE);
