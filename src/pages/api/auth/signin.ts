import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';
import { setCookie } from 'nookies';
import {
  issueTokens,
  refreshTokenExpiration,
  setTokenCookie,
} from '@/libs/server/tokenUtils';

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

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpError(401, 'Invalid email or password');
    }
    const { accessToken, refreshToken } = issueTokens(user);

    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    const { password: _, refreshToken: __, ...loggedInUser } = user;

    // refreshToken만 httpOnly cookie 저장
    setTokenCookie(
      res,
      'refreshToken',
      refreshToken,
      60 * 60 * 24 * refreshTokenExpiration
    );

    // accessToken은 client 저장
    return res.status(200).json({
      message: 'successful',
      user: loggedInUser,
      accessToken,
    });
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
