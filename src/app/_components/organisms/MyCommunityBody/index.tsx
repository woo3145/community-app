'use client';

import { useState } from 'react';
import { MyCommunityTab } from './MyCommunityTab';
import { MyPosts } from './MyPosts';
import { MyComments } from './MyComments';
import { MyRecents } from './MyRecents';
import { MyLikes } from './MyLikes';

import styles from './styles.module.scss';

export type MyCommunityTabType = 'recents' | 'posts' | 'comments' | 'likes';

export const MyCommunityBody = () => {
  const [tab, setTab] = useState<MyCommunityTabType>('recents');

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
