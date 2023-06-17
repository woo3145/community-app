import { NextResponse } from 'next/server';

import { z } from 'zod';

import client from '@/libs/prisma';
import { withErrorHandling } from '@/libs/server/errorHandler';

const ParamsSchema = z.object({
  params: z.object({
    userId: z.string(),
    postId: z.string(),
  }),
});

type Params = z.infer<typeof ParamsSchema>;

// 유저가 해당 게시글을 좋아하는지 여부
const _GET = async (req: Request, params: Params) => {
  const {
    params: { userId, postId },
  } = ParamsSchema.parse(params);

  const likes = await client.likedPost.findFirst({
    where: {
      userId,
      postId: parseInt(postId),
    },
  });

  return NextResponse.json({ data: likes ? true : false });
};

export const GET = withErrorHandling(_GET);
