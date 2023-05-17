import { UserCommunityBody } from '@/app/_components/organisms/UserCommunityBody';
import { UserCommunityProfile } from '@/app/_components/organisms/UserCommunityProfile';

interface Props {
  params: {
    user_id: string;
  };
}

export const metadata = {
  title: 'Woo3145 - Profile',
};

export default function ProfilePage({ params: { user_id } }: Props) {
  return (
    <main className="w-full max-w-screen-md mx-auto pt-14">
      <div className="w-full">
        <UserCommunityProfile userId={user_id} />
      </div>
      <div className="w-full mt-3">
        <UserCommunityBody userId={user_id} />
      </div>
    </main>
  );
}
