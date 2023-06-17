import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import client from '@/libs/prisma';
import { getPostById } from '@/libs/prisma/post';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';
import { authOptions } from '@/libs/server/auth';
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

// 게시글 좋아요 수 불러오기
const _GET = async (req: Request, { params }: Params) => {
  const {
    params: { postId },
  } = ParamsSchema.parse(params);
  const post = await getPostById(postId);

  if (!post) {
    throw new NotFoundError();
  }

  return NextResponse.json({ data: post._count.likes });
};

// 좋아요 & 취소
const _PUT = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  const {
    params: { postId },
  } = ParamsSchema.parse(params);

  const bodySchema = z.object({
    isLiked: z.boolean(),
  });
  const body = await req.json();
  const { isLiked } = bodySchema.parse(body);

  // 유저가 좋아요를 누른 상태인지 확인
  const existLike = await client.likedPost.findFirst({
    where: {
      userId: session.user.id,
      postId: postId,
    },
  });

  // 좋아요 처리
  if (isLiked && !existLike) {
    await client.likedPost.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        post: {
          connect: { id: postId },
        },
      },
    });

    // 좋아요 삭제 처리
  } else if (!isLiked && existLike) {
    await client.likedPost.delete({
      where: {
        id: existLike.id,
      },
    });
  }

  return NextResponse.json({ message: 'successful' });
};

export const GET = withErrorHandling(_GET);
export const PUT = withErrorHandling(_PUT);
