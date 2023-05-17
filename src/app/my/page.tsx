import { redirect } from 'next/navigation';
import { MyCommunityBody } from '@/app/_components/organisms/MyCommunityBody';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { MyCommunityProfile } from '../_components/organisms/MyCommunityProfile';

export const metadata = {
  title: 'Woo3145 - My',
};
export default async function MyCommunityPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="w-full max-w-screen-md mx-auto pt-14">
      <div className="w-full">
        <MyCommunityProfile />
      </div>
      <div className="w-full mt-3">
        <MyCommunityBody />
      </div>
    </main>
  );
}
