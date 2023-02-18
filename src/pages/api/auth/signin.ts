import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import client from '@/libs/server/prismaClient';

interface LoginUserBody {
  email: string;
  password: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as LoginUserBody;

    const user = await client.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpError(401, 'Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpError(401, 'Invalid email or password');
    }
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_ACCESS_TOKEN_SECRET || 'default',
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_TOKEN_SECRET || 'default',
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION }
    );

    client.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    const { password: _, ...loggedInUser } = user;
    res.setHeader('Set-Cookie', [
      `accessToken=${accessToken}; HttpOnly`,
      `refreshToken=${refreshToken}; HttpOnly`,
    ]);
    return res.status(200).json({
      message: 'successful',
      user: loggedInUser,
    });
  }
  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
