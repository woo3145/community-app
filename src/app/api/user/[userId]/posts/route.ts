import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { getPostsByUserId } from '@/libs/prisma/post';
import { authOptions } from '@/libs/server/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    userId: string;
  };
}
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
export const GET = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  const { userId } = params;
  const { page, limit } = getParams(req);

  const posts = await getPostsByUserId(userId, page, limit);
  const postsWithIsLiked = posts.map((post) =>
    addIsLikedAndIsCommented(post, session?.user.id)
  );

  return NextResponse.json({ data: postsWithIsLiked });
};
