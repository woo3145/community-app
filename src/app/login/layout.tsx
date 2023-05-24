import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const metadata = {
  title: 'Woo3145 - Login',
};

// Server Side에서 세션확인 후 로그인 된 상태면 리다이렉트
export default async function LogIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <div className="w-full max-w-md py-10 mx-auto">{children}</div>;
}
