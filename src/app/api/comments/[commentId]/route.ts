import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import { authOptions } from '@/libs/server/auth';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';
import { withErrorHandling } from '@/libs/server/errorHandler';
import { deleteComment, getCommentById } from '@/libs/prisma/comment';

const ParamsSchema = z.object({
  params: z.object({
    commentId: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'Must be a valid string representation of a number',
      })
      .transform((value) => Number(value)),
  }),
});

type Params = z.infer<typeof ParamsSchema>;

const _DELETE = async (req: Request, params: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  const {
    params: { commentId },
  } = ParamsSchema.parse(params);
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new NotFoundError();
  }

  if (!comment.userId || comment.userId !== session.user.id) {
    throw new NotFoundError();
  }

  await deleteComment(comment.id);

  return NextResponse.json({ message: 'successful' });
};

export const DELETE = withErrorHandling(_DELETE);
