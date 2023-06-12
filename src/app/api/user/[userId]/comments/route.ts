import { NextResponse } from 'next/server';

import { z } from 'zod';

import { getCommentsByUserId } from '@/libs/prisma/comment';
import { withErrorHandling } from '@/libs/server/errorHandler';

const ParamsSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

type Params = z.infer<typeof ParamsSchema>;

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

// 유저가 쓴 댓글목록 가져오기
const _GET = async (req: Request, { params }: Params) => {
  const { userId } = params;
  const { page, limit } = getParams(req);

  const comments = await getCommentsByUserId(userId, page, limit);

  return NextResponse.json({ data: comments });
};

export const GET = withErrorHandling(_GET);
