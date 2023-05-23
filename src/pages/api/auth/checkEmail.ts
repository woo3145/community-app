import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling } from '@/libs/server/errorHandler';
import client from '@/libs/prisma';
import { MethodNotAllowedError } from '@/libs/server/customErrors';

const allowedMethods = ['GET'];

const parseQuery = (query: any) => {
  const { email } = query;

  return {
    email: email as string,
  };
};

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { email } = parseQuery(req.query);
  const user = await client.user.findUnique({
    where: { email },
  });

  return res.status(200).json({
    registed: !!user,
  });
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
