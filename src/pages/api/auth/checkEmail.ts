import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(process.env.DATABASE_URL);
  if (req.method === 'GET') {
    const { email } = req.query as { email: string };
    const user = await client.user.findUnique({
      where: { email },
    });
    return res.status(200).json({ registed: !!user });
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
