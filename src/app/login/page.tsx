import { getProviders } from 'next-auth/react';
import { EmailCheck } from './_components/EmailCheck';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

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
