import { UserCommunityBody } from '@/app/_components/organisms/UserCommunityBody';
import { UserCommunityProfile } from '@/app/_components/organisms/UserCommunityProfile';

import styles from './page.module.scss';

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
    <main className={styles.wrapper}>
      <div className={styles.profileSection}>
        <UserCommunityProfile userId={user_id} />
      </div>
      <div className={styles.communitySection}>
        <UserCommunityBody userId={user_id} />
      </div>
    </main>
  );
}
