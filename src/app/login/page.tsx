import { getProviders } from 'next-auth/react';
import { EmailCheck } from './_components/EmailCheck';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/libs/server/auth';

export const metadata = {
  title: 'Woo3145 - Login',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session) {
    redirect('/');
  }

  return (
    <div className="w-full max-w-md py-10 mx-auto">
      <EmailCheck providers={providers} />
    </div>
  );
}
