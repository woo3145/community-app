import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/prisma';
import { NotFoundError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query as { email: string };
    const user = await client.user.findUnique({
      where: { email },
    });

    return res.status(200).json({
      registed: !!user,
    });
  }
  throw new NotFoundError();
}

export default withErrorHandling(handler);
