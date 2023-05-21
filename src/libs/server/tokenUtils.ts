import jwt from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export interface IssueTokens extends Tokens {
  accessTokenExpires: number; // 초단위
}

export const jwtTokenSecret = process.env.JWT_TOKEN_SECRET || 'default';

// accessToken 만료시간 (분단위)
export const accessTokenExpiration = process.env.JWT_ACCESS_TOKEN_EXPIRATION
  ? parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION)
  : 15; // default: 15 minutes

// refreshToken 만료시간 (일단위)
export const refreshTokenExpiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION
  ? parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION)
  : 7; // default: 7 day

export const issueTokens = (userId: string): IssueTokens => {
  const accessToken = jwt.sign({ userId }, jwtTokenSecret, {
    expiresIn: `${accessTokenExpiration}m`,
  });
  const refreshToken = jwt.sign({ userId }, jwtTokenSecret, {
    expiresIn: `${refreshTokenExpiration}d`,
  });

  return {
    accessToken,
    refreshToken,
    accessTokenExpires: accessTokenExpiration,
  };
};
