'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { PostItemLoading } from '@/app/_components/molecules/PostItem/Loading';

import styles from './styles.module.scss';
import { useMyLikes } from '@/hooks/useMyLikes';

export const MyLikes = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyLikes();

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItemLoading key={i} />;
          })
        : data.map((page) =>
            page.likes.map((likesPost) => {
              return <PostItem key={likesPost.post.id} post={likesPost.post} />;
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
