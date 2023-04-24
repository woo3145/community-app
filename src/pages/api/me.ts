import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new HttpError(401, 'Unauthorized');
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
      throw new HttpError(404, '유저를 찾을 수 없습니다.');
    }
    return res.status(200).json({ message: 'successful', user });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
