import { NextResponse } from 'next/server';
import client from '@/libs/prisma';

interface Params {
  params: {
    userId: string;
    postId: string;
  };
}

// 유저가 해당 게시글을 좋아하는지 여부
export const GET = async (req: Request, { params }: Params) => {
  const { userId, postId } = params;

  const likes = await client.likedPost.findFirst({
    where: {
      userId,
      postId: parseInt(postId),
    },
  });

  return NextResponse.json({ data: likes ? true : false });
};
