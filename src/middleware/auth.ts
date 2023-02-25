import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

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
) => {};

export const config = {
  matcher: ['/api/:path*'],
};
