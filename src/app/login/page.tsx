import { redirect } from 'next/navigation';
import EmailCheck from './components/emailCheck';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const metadata = {
  title: 'Woo3145 - Login',
};

export default async function LogIn({ providers }: any) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <EmailCheck />;
}
