import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { getLikedPostsByUserId } from '@/libs/prisma/post';
import { UnauthorizedError } from '@/libs/server/apiErrors';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const getParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '0';
  const limit = searchParams.get('limit') || '15';

  return {
    page: parseInt(page),
    limit: parseInt(limit),
  };
};

// 유저가 쓴 게시물 목록 가져오기
export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
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