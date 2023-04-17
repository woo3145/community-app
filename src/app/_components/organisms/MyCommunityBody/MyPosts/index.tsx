'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyPosts } from '@/hooks/scrollSwr/useMyPosts';
import { PostItemLoading } from '@/app/_components/molecules/PostItem/Loading';

import styles from './styles.module.scss';

export const MyPosts = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyPosts();
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
