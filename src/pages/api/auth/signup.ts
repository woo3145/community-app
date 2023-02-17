import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';

interface CreateUserBody {
  email: string;
  password: string;
  name: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password, name } = req.body as CreateUserBody;

      const user = await client.user.findUnique({
        where: { email },
      });

      if (!!user) {
        throw new HttpError(401, 'Email is already registed');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await client.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return res.status(200).json({ registed: !!user });
    } catch (e) {
      throw new HttpError(400, 'Bad Request');
    }
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
