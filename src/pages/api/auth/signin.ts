import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling } from '@/libs/server/errorHandler';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';
import { User } from 'next-auth';
import { NotFoundError, ValidationError } from '@/libs/server/customErrors';

interface LoginUserBody {
  email: string;
  password: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as LoginUserBody;
    const user = await client.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    const errors = [];
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
  throw new NotFoundError();
}

export default withErrorHandling(handler);
