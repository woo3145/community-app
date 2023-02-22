import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { accessTokenSecret } from '../libs/server/tokenUtils';

import jwt from 'jsonwebtoken';
import client from '@/libs/server/prismaClient';
import { HttpError } from '@/libs/server/errorHandling';
import { User } from '@prisma/client';

interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

declare module 'next' {
  export class NextApiRequest {
    user: User;
  }
}

export const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new HttpError(401, 'Authorization header missing');
  }
  const [_, token] = authHeader.split(' ');

  try {
    const { userId } = jwt.verify(token, accessTokenSecret) as TokenPayload;
    const user = await client.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new HttpError(401, 'User not found');
    }

    const { password: _, refreshToken: __, ...loggedInUser } = user;
    req.user = loggedInUser as User;
    next();
  } catch (e) {
    throw new HttpError(401, 'Invalid access token');
  }
};

export const config = {
  matcher: ['/api/:path*'],
};
