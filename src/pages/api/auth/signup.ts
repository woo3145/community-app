import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling } from '@/libs/server/errorHandler';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';
import { User } from 'next-auth';
import { NotFoundError, ValidationError } from '@/libs/server/customErrors';

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
      throw new ValidationError([
        { field: 'email', message: '이미 가입된 이메일입니다.' },
      ]);
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
  throw new NotFoundError();
}

export default withErrorHandling(handler);
