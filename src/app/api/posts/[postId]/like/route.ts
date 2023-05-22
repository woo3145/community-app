import client from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { LikePostBody } from '@/interfaces/api';
import { NextResponse } from 'next/server';
import { getPostById } from '@/libs/prisma/post';
import { NotFoundError, UnauthorizedError } from '@/libs/server/apiErrors';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface Params {
  params: {
    postId: string;
  };
}

// 게시글 좋아요 수 불러오기
export const GET = async (req: Request, { params }: Params) => {
  const { postId } = params;
  const post = await getPostById(parseInt(postId));

  if (!post) {
    return NotFoundError();
  }

  return NextResponse.json({ data: post._count.likes });
};

// 좋아요 & 취소
export const PUT = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }

  const { postId } = params;
  const { isLiked }: LikePostBody = await req.json();

  // 유저가 좋아요를 누른 상태인지 확인
  const existLike = await client.likedPost.findFirst({
    where: {
      userId: session.user.id,
      postId: parseInt(postId),
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
          connect: { id: parseInt(postId) },
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
