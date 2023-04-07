'use client';

import { useMe } from '@/hooks/useMe';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { PostItem } from '@/app/_components/molecules/PostItem';

import styles from './styles.module.scss';
import { MyCommunityTab } from './MyCommunityTab';

export type MyCommunityTabType = 'recents' | 'posts' | 'comments' | 'likes';

export const MyCommunity = () => {
  const [tab, setTab] = useState<MyCommunityTabType>('recents');
  const { data, isLoading: postIsLoading } = usePosts(''); // 임시
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
      <div>
        {isLoading ? (
          <div>loading..</div>
        ) : (
          <div>
            {data.map((page) =>
              page.posts.map((post) => {
                return <PostItem key={post.id} post={post} />;
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
