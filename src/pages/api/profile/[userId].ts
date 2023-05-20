import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  MethodNotAllowedError,
  NotFoundError,
} from '@/libs/server/customErrors';
import { getProfileByUserId } from '@/libs/prisma/profile';

const parseQuery = (query: any) => {
  const { userId } = query;

  return {
    userId: userId ? userId : '',
  };
};

const allowedMethods = ['GET'];

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = parseQuery(req.query);

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    throw new NotFoundError('profile');
  }
  return res.status(200).json({ message: 'successful', data: profile });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  // 유저 프로필 가져오기
  if (req.method === 'GET') {
    return handleGET(req, res);
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
