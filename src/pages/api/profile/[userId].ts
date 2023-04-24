import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchProfileByUserId } from '@/libs/server/profileUtils/profileFetch';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query as { userId: string };
  if (req.method === 'GET') {
    const profile = await fetchProfileByUserId(userId);

    if (!profile) {
      throw new HttpError(404, '프로필을 찾을 수 없습니다.');
    }
    return res.status(200).json({ message: 'successful', profile });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
