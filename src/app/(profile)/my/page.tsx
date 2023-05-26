import { MyProfileInfo } from './_components/MyProfileInfo';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { MyProfileBody } from './_components/MyProfileBody';
import { authOptions } from '@/libs/server/auth';

export const metadata = {
  title: 'Woo3145 - Profile',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <main className="w-full max-w-screen-md mx-auto pt-14">
      <div className="w-full">
        <MyProfileInfo />
      </div>
      <div className="w-full mt-3">
        <MyProfileBody />
      </div>
    </main>
  );
}
