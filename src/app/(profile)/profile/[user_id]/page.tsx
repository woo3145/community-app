import { UserProfileInfo } from './UserProfileInfo';
import { UserProfileBody } from './body/UserProfileBody';

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
        <UserProfileInfo userId={user_id} />
      </div>
      <div className="w-full mt-3">
        <UserProfileBody userId={user_id} />
      </div>
    </main>
  );
}
