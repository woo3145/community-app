import { NextResponse } from 'next/server';
import client from '@/libs/prisma';
import { ValidationError } from '@/libs/server/apiErrors';
import bcrypt from 'bcrypt';
import { User } from 'next-auth';

interface LoginUserBody {
  email: string;
  password: string;
}

export const POST = async (req: Request) => {
  const { email, password }: LoginUserBody = await req.json();

  const user = await client.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return ValidationError();
  }

  if (user.password == null) {
    return ValidationError();
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return ValidationError();
  }
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
