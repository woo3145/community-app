import { redirect } from 'next/navigation';
import { MyCommunityBody } from '@/app/_components/organisms/MyCommunityBody';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import styles from './page.module.scss';
import { MyCommunityProfile } from '../_components/organisms/MyCommunityProfile';

export default async function MyCommunityPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profileSection}>
        <MyCommunityProfile />
      </div>
      <div className={styles.communitySection}>
        <MyCommunityBody />
      </div>
    </main>
  );
}
