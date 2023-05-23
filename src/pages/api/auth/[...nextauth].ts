import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import client from '@/libs/prisma';

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
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
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
