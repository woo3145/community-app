'use client';

import { useState } from 'react';
import { MyProfileTabs } from './MyProfileTabs';
import { MyRecents } from './MyRecents';
import { MyPosts } from './MyPosts';
import { MyComments } from './MyComments';
import { MyLikes } from './MyLikes';

export type MyProfileTabType = 'recents' | 'posts' | 'comments' | 'likes';

export const MyProfileBody = () => {
  const [tab, setTab] = useState<MyProfileTabType>('recents');

  return (
    <div className="card">
      <MyProfileTabs tab={tab} setTab={setTab} />
      {tab === 'recents' && <MyRecents />} {/* 임시 */}
      {tab === 'posts' && <MyPosts />}
      {tab === 'comments' && <MyComments />}
      {tab === 'likes' && <MyLikes />} {/* 임시 */}
    </div>
  );
};
