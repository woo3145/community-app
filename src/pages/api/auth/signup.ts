import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling } from '@/libs/server/errorHandler';
import { User } from 'next-auth';
import {
  MethodNotAllowedError,
  ValidationError,
} from '@/libs/server/customErrors';
import bcrypt from 'bcrypt';
import client from '@/libs/prisma';

interface CreateUserBody {
  email: string;
  password: string;
  name: string;
}

const allowedMethods = ['POST'];

interface LoginUserBody {
  email: string;
  password: string;
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body as CreateUserBody;

  const user = await client.user.findUnique({
    where: { email },
  });

  if (!!user) {
    throw new ValidationError([
      { field: 'email', message: '이미 가입된 이메일입니다.' },
    ]);
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

  return res.status(200).json({
    message: 'successful',
    user: loggedInUser,
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  if (req.method === 'POST') {
    return handlePOST(req, res);
  }
}

export default withErrorHandling(handler);
