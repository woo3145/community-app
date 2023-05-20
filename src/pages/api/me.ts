import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import {
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { getProfileInclude } from '@/libs/prisma/dataShapes';

const allowedMethods = ['GET'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const user = await client.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      profile: {
        include: getProfileInclude(),
      },
    },
  });

  if (!user) {
    throw new NotFoundError('user');
  }
  return res.status(200).json({ message: 'successful', data: user });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  if (req.method === 'GET') {
    return handleGET(req, res, session);
  }
}

export default withErrorHandling(handler);
