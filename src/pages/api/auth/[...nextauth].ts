import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions, TokenSet } from 'next-auth';
import NextAuth from 'next-auth/next';
import client from '@/libs/server/prismaClient';
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
        const response = await fetch('http://localhost:3000/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

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
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, account }) {
      // https://authjs.dev/guides/basics/refresh-token-rotation

      // 첫 로그인 시 토큰 발행
      if (account) {
        // credentials 공급자면 직접 발행
        if (account.type === 'credentials') {
          const tokens = issueTokens(token.email as string);
          return {
            ...token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in), // Date.now()의 단위를 ms => s로 변경 후 expires_in 적용
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            type: account.type,
          };
        }

        // 그외 공급자가 있을 경우 받아온 accessToken, refreshToken 사용
        return {
          ...token,
          access_token: account.access_token as string,
          expires_at: account.expires_at as number,
          refresh_token: account.refresh_token as string,
          type: account.type,
        };

        // 토큰이 아직 유효 할 경우 그대로 반환 (expires_at의 단위를 ms로 변경하여 비교)
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          // 만료 되었다면 각 공급자에 맞게 refresh token으로 재발급

          if (token.type === 'credentials') {
            console.log('credentials 토큰 재발급');
            const response = await fetch(
              'http://localhost:3000/api/auth/refresh',
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
              access_token: tokens.accessToken,
              refresh_token: tokens.refreshToken,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            };
          }

          // 그외 공급자가 있을경우 공급자에 맞춰 리프레시
          return {
            ...token,
            access_token: '재발급한 토큰',
            refresh_token: '재발급한 토큰',
            expires_at: Math.floor(Date.now() / 1000 + 999999999),
          };
        } catch (e) {
          // refreshToken 까지 만료되거나 오류가 발생한 경우
          console.error('Error refreshing access token');
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_TOKEN_SECRET,
};

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    type: string;
    error?: 'RefreshAccessTokenError';
  }
}

export default NextAuth(authOptions);
