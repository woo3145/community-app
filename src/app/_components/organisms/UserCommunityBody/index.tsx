'use client';

import { useState } from 'react';
import { UserPosts } from './UserPosts';
import { UserCommunityTab } from './UserCommunityTab';
import { UserComments } from './UserComments';

import styles from './styles.module.scss';

export type UserCommunityTabType = 'posts' | 'comments';

interface Props {
  userId: string;
}

export const UserCommunityBody = ({ userId }: Props) => {
  const [tab, setTab] = useState<UserCommunityTabType>('posts');

  return (
    <div className={styles.wrapper}>
      <UserCommunityTab tab={tab} setTab={setTab} />
      {tab === 'posts' && <UserPosts userId={userId} />}
      {tab === 'comments' && <UserComments userId={userId} />}
    </div>
  );
};
