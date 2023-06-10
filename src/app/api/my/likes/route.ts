import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { getLikedPostsByUserId } from '@/libs/prisma/post';
import { authOptions } from '@/libs/server/auth';
import { UnauthorizedError } from '@/libs/server/customErrors';
import { withErrorHandling } from '@/libs/server/errorHandler';

const QueryParamsSchema = z.object({
  page: z
    .number()
    .optional()
    .transform((value) => (value ? value : 0)),
  limit: z
    .number()
    .optional()
    .transform((value) => (value ? value : 15)),
});

const getParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  return QueryParamsSchema.parse({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });
};

// 유저가 쓴 게시물 목록 가져오기
const _GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  const { page, limit } = getParams(req);

  const likedPosts = await getLikedPostsByUserId(session.user.id, page, limit);
  const likedPostWithIsLiked = likedPosts.map((like) => {
    return {
      ...like,
      post: addIsLikedAndIsCommented(like.post, session.user.id),
    };
  });

  return NextResponse.json({ data: likedPostWithIsLiked });
};

export const GET = withErrorHandling(_GET);
