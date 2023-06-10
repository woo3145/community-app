import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import client from '@/libs/prisma';
import { authOptions } from '@/libs/server/auth';
import { getProfileInclude } from '@/libs/prisma/dataShapes';
import { withErrorHandling } from '@/libs/server/errorHandler';
import { UnauthorizedError } from '@/libs/server/customErrors';

// 로그인한 사용자 가져오기
const _GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
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

export const GET = withErrorHandling(_GET);
