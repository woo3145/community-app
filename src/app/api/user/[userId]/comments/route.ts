import { getCommentsByUserId } from '@/libs/prisma/comment';
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

// 유저가 쓴 댓글목록 가져오기
export const GET = async (req: Request, { params }: Params) => {
  const { userId } = params;
  const { page, limit } = getParams(req);

  const comments = await getCommentsByUserId(userId, page, limit);

  return NextResponse.json({ data: comments });
};
