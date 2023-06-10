import { NextResponse } from 'next/server';
import { User } from 'next-auth';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import client from '@/libs/prisma';
import { withErrorHandling } from '@/libs/server/errorHandler';
import { NotFoundError, ValidationError } from '@/libs/server/customErrors';

const EmailLoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const validateUserPassword = async (
  password: string,
  storedPassword: string | null
) => {
  if (!storedPassword) {
    throw new ValidationError('password');
  }

  const passwordMatches = await bcrypt.compare(password, storedPassword);
  if (!passwordMatches) {
    throw new ValidationError('password');
  }
};

const _POST = async (req: Request) => {
  const body = await req.json();

  const { email, password } = EmailLoginInputSchema.parse(body);

  const user = await client.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new NotFoundError('user');
  }
  await validateUserPassword(password, user.password);

  const loggedInUser: User = {
    id: user.id,
    email: user.email,
    name: user.profile?.name,
    image: user.profile?.avatar,
  };

  return NextResponse.json({
    message: 'successful',
    user: loggedInUser,
  });
};

export const POST = withErrorHandling(_POST);
