import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedError } from '@/libs/server/customErrors';
import { getTags } from '@/libs/prisma/tag';

const allowedMethods = ['GET'];

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const tags = await getTags();

  return res.status(200).json({ message: 'successful', data: tags });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }

  if (req.method === 'GET') {
    return handleGET(req, res);
  }
}

export default withErrorHandling(handler);
