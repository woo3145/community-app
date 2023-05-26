import { NextResponse } from 'next/server';
import client from '@/libs/prisma';

const getParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';

  return {
    email,
  };
};

export const GET = async (req: Request) => {
  const { email } = getParams(req);
  const user = await client.user.findUnique({
    where: { email },
  });
  const isOAuth = user && !user.password;

  return NextResponse.json({
    registed: !!user,
    isOAuth,
  });
};
