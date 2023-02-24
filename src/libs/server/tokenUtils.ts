import jwt from 'jsonwebtoken';
import client from '@/libs/server/prismaClient';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
interface IssueTokens extends Tokens {
  expires_in: number;
}

export const accessTokenSecret =
  process.env.JWT_ACCESS_TOKEN_SECRET || 'default';
export const refreshTokenSecret =
  process.env.JWT_REFRESH_TOKEN_SECRET || 'default';

export const accessTokenExpiration = process.env.JWT_ACCESS_TOKEN_EXPIRATION
  ? parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION)
  : 60;
export const refreshTokenExpiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION
  ? parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION)
  : 7;

export const issueTokens = (email: string): IssueTokens => {
  const accessToken = jwt.sign({ email: email }, accessTokenSecret, {
    expiresIn: `${accessTokenExpiration}m`,
  });
  const refreshToken = jwt.sign({ email: email }, refreshTokenSecret, {
    expiresIn: `${refreshTokenExpiration}d`,
  });
  return { accessToken, refreshToken, expires_in: accessTokenExpiration };
};

export const setTokenCookie = (
  res: NextApiResponse,
  name: string,
  token: string,
  expires: number
): void => {
  setCookie({ res }, name, token, {
    maxAge: expires,
    paht: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};
export const clearTokenCookie = (res: NextApiResponse, name: string): void => {
  destroyCookie({ res }, name);
};

export const getTokens = (req: NextApiRequest): Tokens => {
  const cookies = parseCookies({ req });

  return {
    accessToken: cookies.accessToken,
    refreshToken: cookies.refreshToken,
  };
};
