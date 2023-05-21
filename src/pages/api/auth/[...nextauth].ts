import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import client from '@/libs/prisma';
import { IssueTokens, issueTokens } from '@/libs/server/tokenUtils';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: '이메일 로그인',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: '이메일을 입력해 주세요',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '비밀번호를 입력해주세요.',
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const responseJson = await response.json();

        if (response.ok && responseJson.user) {
          return responseJson.user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    error: '/error',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // https://authjs.dev/guides/basics/refresh-token-rotation
      // 첫 로그인 시 토큰 발행
      if (account && user) {
        // credentials 공급자면 직접 발행
        if (account.type === 'credentials') {
          return {
            ...token,
            accessTokenExpires: Math.floor(
              Date.now() / 1000 + user.tokens.accessTokenExpires
            ), // Date.now()의 단위를 ms => s로 변경 후 accessTokenExpires 적용
            accessToken: user.tokens.accessToken,
            refreshToken: user.tokens.refreshToken,
            type: account.type,
          };
        }

        // 그외 공급자(ex. google)가 있을 경우 받아온 accessToken, refreshToken 사용
        return {
          ...token,
          accessToken: account.access_token as string,
          accessTokenExpires: account.expires_at as number,
          refreshToken: account.refresh_token as string,
          type: account.type,
        };

        // 토큰이 아직 유효 할 경우 그대로 반환 (accessTokenExpires의 단위를 ms로 변경하여 비교)
      } else if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      } else {
        try {
          // 만료 되었다면 각 공급자에 맞게 refresh token으로 재발급
          if (token.type === 'credentials') {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  refreshToken: token.refresh_token,
                }),
              }
            );

            const tokens: IssueTokens = await response.json();

            if (!response.ok) throw tokens; // 리프레시가 실패한 경우

            return {
              ...token,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              accessTokenExpires: Math.floor(
                Date.now() / 1000 + tokens.accessTokenExpires
              ),
            };
          }

          // 그외 공급자가 있을경우 공급자에 맞춰 리프레시
          return {
            ...token,
            accessToken: '재발급한 토큰',
            refreshToken: '재발급한 토큰',
            accessTokenExpires: Math.floor(Date.now() / 1000 + 999999999),
          };
        } catch (e) {
          // refreshToken 까지 만료되거나 오류가 발생한 경우
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      session.user.id = token.sub as string;
      // 클라이언트엔 엑세스토큰만 보냄
      session.user.tokens = {
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
      };

      return session;
    },
  },
  session: {
    strategy: 'jwt', // PrismaAdapter를 사용중임으로 default값이 database로 되어있어서 변경 필요
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // nextAuth에서 jwt의 최대 만료시간 설정
  },
  secret: process.env.JWT_TOKEN_SECRET,
};

export default NextAuth(authOptions);

// nextAuth 디폴트 user 필드에 토큰 추가
interface SessionUser extends DefaultUser {
  id: string;
  tokens: {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken?: string;
  };
}

declare module 'next-auth/core/types' {
  interface Session {
    error?: 'RefreshAccessTokenError';
    user: SessionUser;
  }
  interface User extends SessionUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken?: string;
    type: string;
    error?: 'RefreshAccessTokenError';
  }
}
