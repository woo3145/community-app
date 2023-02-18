import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';

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
        name,
      },
    });
    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_ACCESS_TOKEN_SECRET || 'default',
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_REFRESH_TOKEN_SECRET || 'default',
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION }
    );
    const { password: _, ...loggedInUser } = newUser;

    return res.status(200).json({
      message: 'successful',
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
