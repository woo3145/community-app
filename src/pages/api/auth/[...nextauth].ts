import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { AuthOptions, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import client from '@/libs/prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
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
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/emailLogin`,
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
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user) return false;

      // 간편로그인인 경우 User의 Schema가 공식문서와 다르기 때문에(name과 avatar가 profile에 있음) 가입 시 직접 생성해야함
      if (profile && account) {
        const exist = await client.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!exist) {
          const newUser = await client.user.create({
            data: {
              email: profile.email,
              profile: {
                create: {
                  name: profile.name || '이름을 설정해주세요.',
                  annual: 0,
                  avatar: profile.image,
                },
              },
            },
          });
          await client.account.create({
            data: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              user: {
                connect: {
                  id: newUser.id,
                },
              },
              type: account.type,
              access_token: account.access_token,
              token_type: account.token_type,
              expires_at: account.expires_at,
              scope: account.scope,
              id_token: account.id_token,
            },
          });
        }
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt', // PrismaAdapter를 사용중임으로 default값이 database로 되어있어서 변경 필요
    maxAge: 60 * 60 * 24 * 30, // 30days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

// nextAuth 디폴트 user 필드에 userId 추가
interface SessionUser extends DefaultUser {
  id: string;
}

declare module 'next-auth/core/types' {
  interface Session {
    user: SessionUser;
  }
  interface User extends SessionUser {}
}
