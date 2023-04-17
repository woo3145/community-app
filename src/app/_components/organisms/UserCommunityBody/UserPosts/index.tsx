'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { PostItemLoading } from '@/app/_components/molecules/PostItem/Loading';
import { useUserPosts } from '@/hooks/scrollSwr/useUserPosts';

import styles from './styles.module.scss';

export const UserPosts = ({ userId }: { userId: string }) => {
  const { data, isLoading, bottomRef, isReachedEnd } = useUserPosts(userId);
  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItemLoading key={i} />;
          })
        : data.map((page) =>
            page.data.map((post) => {
              return <PostItem key={post.id} post={post} />;
            })
          )}
      {isLoading ? (
        <PostItemLoading />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
};
