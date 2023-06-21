import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { UserProfileInfo } from './_components/UserProfileInfo';
import { UserProfileBody } from './_components/UserProfileBody';
import { authOptions } from '@/libs/server/auth';

interface Props {
  params: {
    user_id: string;
  };
}

export const metadata = {
  title: 'Woo3145 - Profile',
};

export default async function ProfilePage({ params: { user_id } }: Props) {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.id === user_id) {
    redirect('/my');
  }

  return (
    <main className="mx-auto xl:pt-14">
      <div className="w-full">
        <UserProfileInfo userId={user_id} />
      </div>
      <div className="w-full mt-3">
        <UserProfileBody userId={user_id} />
      </div>
    </main>
  );
}
