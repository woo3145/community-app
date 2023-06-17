import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import { createComment, getCommentsByPostId } from '@/libs/prisma/comment';
import { authOptions } from '@/libs/server/auth';
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@/libs/server/customErrors';
import { getPostById } from '@/libs/prisma/post';
import { withErrorHandling } from '@/libs/server/errorHandler';

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

const _GET = async (req: Request, params: Params) => {
  const {
    params: { postId },
  } = ParamsSchema.parse(params);
  const comments = await getCommentsByPostId(postId);

  return NextResponse.json({ data: comments });
};

const _POST = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  const {
    params: { postId },
  } = ParamsSchema.parse(params);

  const bodySchema = z.object({
    content: z.string().min(1, { message: 'Content is required' }),
  });
  const body = await req.json();
  const { content } = bodySchema.parse(body);

  const post = await getPostById(postId);
  if (!post) {
    throw new NotFoundError('post');
  }

  if (!content) {
    throw new ValidationError();
  }
  const newComment = await createComment(session.user.id, post.id, content);

  return NextResponse.json({ data: newComment });
};

export const GET = withErrorHandling(_GET);
export const POST = withErrorHandling(_POST);
