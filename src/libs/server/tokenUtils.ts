import jwt from 'jsonwebtoken';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export interface IssueTokens extends Tokens {
  expires_in: number; // 초단위
}

export const jwtTokenSecret = process.env.JWT_TOKEN_SECRET || 'default';

export const accessTokenExpiration = process.env.JWT_ACCESS_TOKEN_EXPIRATION
  ? parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION)
  : 15;
export const refreshTokenExpiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION
  ? parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION)
  : 7;

export const issueTokens = (sub: string): IssueTokens => {
  const accessToken = jwt.sign({ sub }, jwtTokenSecret, {
    expiresIn: `${accessTokenExpiration}m`,
  });
  const refreshToken = jwt.sign({ sub }, jwtTokenSecret, {
    expiresIn: `${refreshTokenExpiration}d`,
  });
  return {
    accessToken,
    refreshToken,
    expires_in: 60 * accessTokenExpiration,
  };
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
