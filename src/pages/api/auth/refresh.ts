import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/server/prismaClient';
import jwt from 'jsonwebtoken';
import { issueTokens, jwtTokenSecret } from '@/libs/server/tokenUtils';
import { NotFoundError, ValidationError } from '@/libs/server/customErrors';
import { UnauthorizedError } from '@/libs/server/customErrors';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ValidationError([
        {
          field: 'refresh token',
          message: 'refresh token이 존재하지 않습니다.',
        },
      ]);
    }

    try {
      // refresh 토큰이 유효한지 확인
      const { sub } = jwt.verify(refreshToken, jwtTokenSecret) as TokenPayload;
      const user = await client.user.findUnique({ where: { id: sub } });

      if (!user) {
        throw new NotFoundError('user');
      }
      // 유효하다면 재발급
      const {
        accessToken,
        refreshToken: newRefreshToken,
        expires_in,
      } = issueTokens(user.id);

      return res
        .status(200)
        .json({ accessToken, refreshToken: newRefreshToken, expires_in });
    } catch (e) {
      throw new UnauthorizedError();
    }
  }
  throw new NotFoundError();
}

export default withErrorHandling(handler);
