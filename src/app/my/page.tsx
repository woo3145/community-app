'use client';

import { useMe } from '@/hooks/useMe';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';
import { MyCommunity } from '@/app/_components/organisms/MyCommunity';
import { MyPageProfile } from '../_components/organisms/MyPageProfile';

export default function MyCommunityPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me, isLoading } = useMe();
  const { data: session, status } = useSession();

  if (status !== 'loading' && !session) {
    redirect('/login');
  }

  if (isLoading || !me) {
    return <div>로딩 ... </div>;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profileSection}>
        <MyPageProfile profile={me.profile} />
      </div>
      <div className={styles.communitySection}>
        <MyCommunity />
      </div>
    </main>
  );
}
