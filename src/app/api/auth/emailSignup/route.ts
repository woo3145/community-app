import { NextResponse } from 'next/server';
import { User } from 'next-auth';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import client from '@/libs/prisma';
import { ValidationError } from '@/libs/server/customErrors';
import { withErrorHandling } from '@/libs/server/errorHandler';

const EmailSignupInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(2).max(20),
});

const _POST = async (req: Request) => {
  const body = await req.json();

  const { email, password, name } = EmailSignupInputSchema.parse(body);

  const user = await client.user.findUnique({
    where: { email },
  });

  if (!!user) {
    throw new ValidationError({});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await client.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          name,
          annual: 0,
        },
      },
    },
    include: {
      profile: true,
    },
  });
  const loggedInUser: User = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.profile?.name,
    image: newUser.profile?.avatar,
  };

  return NextResponse.json({
    message: 'successful',
    user: loggedInUser,
  });
};

export const POST = withErrorHandling(_POST);
