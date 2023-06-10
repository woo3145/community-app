import { NextResponse } from 'next/server';

import { z } from 'zod';

import client from '@/libs/prisma';
import { withErrorHandling } from '@/libs/server/errorHandler';

const EmailSchema = z.object({
  email: z.string().email(),
});

const getParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';

  return EmailSchema.parse({
    email,
  });
};

const _GET = async (req: Request) => {
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

export const GET = withErrorHandling(_GET);
