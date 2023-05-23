import { getCommentsByUserId } from '@/libs/prisma/comment';
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

// 유저가 쓴 댓글목록 가져오기
export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }
  const { page, limit } = getParams(req);

  const comments = await getCommentsByUserId(session.user.id, page, limit);

  return NextResponse.json({ data: comments });
};
