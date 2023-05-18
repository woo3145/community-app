'use client';

import { useState } from 'react';
import { UserProfileTabs } from './UserProfileTabs';
import { UserPosts } from './UserPosts';
import { UserComments } from './UserComments';
export type UserProfileTabType = 'posts' | 'comments';

interface Props {
  userId: string;
}

export const UserProfileBody = ({ userId }: Props) => {
  const [tab, setTab] = useState<UserProfileTabType>('posts');

  return (
    <div className="card">
      <UserProfileTabs tab={tab} setTab={setTab} />
      {tab === 'posts' && <UserPosts userId={userId} />}
      {tab === 'comments' && <UserComments userId={userId} />}
    </div>
  );
};
