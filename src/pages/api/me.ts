import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
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
    const profile = await client.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        jobs: true,
        interestTags: true,
      },
    });

    if (!profile) {
      throw new HttpError(404, '프로필을 찾을 수 없습니다.');
    }
    return res.status(200).json({ message: 'successful', profile });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
