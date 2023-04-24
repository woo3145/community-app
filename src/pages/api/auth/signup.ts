import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';
import { User } from 'next-auth';

interface CreateUserBody {
  email: string;
  password: string;
  name: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
        profile: {
          create: {
            name,
            annual: 0,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    const loggedInUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.profile?.name,
      image: newUser.profile?.avatar,
    };

    // accessToken은 client 저장
    return res.status(200).json({
      message: 'successful',
      user: loggedInUser,
    });
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
