'use client';

import { useMe } from '@/hooks/useMe';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

import styles from './styles.module.scss';
import { MyCommunityTab } from './MyCommunityTab';
import { MyPosts } from './MyPosts';
import { MyComments } from './MyComments';
import { MyRecents } from './MyRecents';
import { MyLikes } from './MyLikes';

export type MyCommunityTabType = 'recents' | 'posts' | 'comments' | 'likes';

export const MyCommunity = () => {
  const [tab, setTab] = useState<MyCommunityTabType>('recents');
  const { me, isLoading } = useMe();
  const { data: session, status } = useSession();

  if (status !== 'loading' && !session) {
    redirect('/login');
  }

  if (isLoading || !me) {
    return <div>로딩 ... </div>;
  }

  return (
    <div className={styles.wrapper}>
      <MyCommunityTab tab={tab} setTab={setTab} />
      {tab === 'recents' && <MyRecents />} {/* 임시 */}
      {tab === 'posts' && <MyPosts />}
      {tab === 'comments' && <MyComments />}
      {tab === 'likes' && <MyLikes />} {/* 임시 */}
    </div>
  );
};
