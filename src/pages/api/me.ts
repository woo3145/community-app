import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  if (req.method === 'GET') {
    const user = await client.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        profile: {
          include: {
            job: true,
            interestTags: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('user');
    }
    return res.status(200).json({ message: 'successful', data: user });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
