import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';
import { User } from 'next-auth';

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
    if (!user) {
      throw new HttpError(401, 'Invalid email or password');
    }

    if (user.password == null) {
      throw new HttpError(401, '비밀번호를 등록하지 않은 계정이에요.');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpError(401, 'Invalid email or password');
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
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
