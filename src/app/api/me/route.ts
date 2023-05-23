import { UnauthorizedError } from '@/libs/server/apiErrors';
import { NextResponse } from 'next/server';
import client from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getProfileInclude } from '@/libs/prisma/dataShapes';

interface Params {
  params: {
    userId: string;
  };
}

// 로그인한 사용자 가져오기
export const GET = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }

  const user = await client.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      profile: {
        include: getProfileInclude(),
      },
    },
  });

  return NextResponse.json({ data: user });
};
