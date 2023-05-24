import { User } from 'next-auth';
import { ValidationError } from '@/libs/server/customErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedError } from '@/libs/server/customErrors';
import { withErrorHandling } from '@/libs/server/errorHandler';
import bcrypt from 'bcrypt';
import client from '@/libs/prisma';

const allowedMethods = ['POST'];

interface LoginUserBody {
  email: string;
  password: string;
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body as LoginUserBody;
  const user = await client.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new ValidationError([
      {
        field: 'email or password',
        message: '이메일 또는 패스워드가 잘못되었습니다.',
      },
    ]);
  }

  if (user.password == null) {
    throw new ValidationError([
      {
        field: 'password',
        message: '간편 로그인으로 가입된 계정이 존재합니다.',
      },
    ]);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new ValidationError([
      {
        field: 'email or password',
        message: '이메일 또는 패스워드가 잘못되었습니다.',
      },
    ]);
  }
  const loggedInUser: User = {
    id: user.id,
    email: user.email,
    name: user.profile?.name,
    image: user.profile?.avatar,
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