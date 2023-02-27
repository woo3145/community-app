import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';

interface LoginUserBody {
  email: string;
  password: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as LoginUserBody;

    const user = await client.user.findUnique({
      where: { email },
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
    const { password: _, ...loggedInUser } = user;

    return res.status(200).json({
      message: 'successful',
      user: loggedInUser,
    });
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
