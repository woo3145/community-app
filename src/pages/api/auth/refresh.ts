import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import jwt from 'jsonwebtoken';
import {
  issueTokens,
  jwtTokenSecret,
  refreshTokenExpiration,
  setTokenCookie,
} from '@/libs/server/tokenUtils';

interface TokenPayload {
  email: string;
  iat: number;
  exp: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new HttpError(400, 'Refresh Token not provided');
    }

    try {
      // refresh 토큰이 유효한지 확인
      const { email } = jwt.verify(
        refreshToken,
        jwtTokenSecret
      ) as TokenPayload;

      const user = await client.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      // 유효하다면 재발급
      const {
        accessToken,
        refreshToken: newRefreshToken,
        expires_in,
      } = issueTokens(email);

      return res
        .status(200)
        .json({ accessToken, refreshToken: newRefreshToken, expires_in });
    } catch (e) {
      console.error(e);
      throw new HttpError(401, 'Invalid refresh token');
    }
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
