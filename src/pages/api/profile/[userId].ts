import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchProfileByUserId } from '@/libs/server/profileUtils/profileFetch';
import { NotFoundError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query as { userId: string };
  if (req.method === 'GET') {
    const profile = await fetchProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundError('profile');
    }
    return res.status(200).json({ message: 'successful', data: profile });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
