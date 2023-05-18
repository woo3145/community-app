import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const metadata = {
  title: 'Woo3145 - Login',
};

export default async function LogIn({
  providers,
  children,
}: {
  providers: any;
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <div className="w-full max-w-md mx-auto py-10">{children}</div>;
}
