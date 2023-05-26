import { NextResponse } from 'next/server';
import client from '@/libs/prisma';
import { ValidationError } from '@/libs/server/apiErrors';
import bcrypt from 'bcrypt';
import { User } from 'next-auth';

interface CreateUserBody {
  email: string;
  password: string;
  name: string;
}

export const POST = async (req: Request) => {
  const { email, password, name }: CreateUserBody = await req.json();

  const user = await client.user.findUnique({
    where: { email },
  });

  if (!!user) {
    return ValidationError();
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
