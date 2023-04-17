'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { PostItemLoading } from '@/app/_components/molecules/PostItem/Loading';

import styles from './styles.module.scss';
import { useMyRecents } from '@/hooks/scrollSwr/useMyRecents';

export const MyRecents = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyRecents();

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItemLoading key={i} />;
          })
        : data.map((page) =>
            page.data.map((recentlyViewdPost) => {
              return (
                <PostItem
                  key={recentlyViewdPost.post.id}
                  post={recentlyViewdPost.post}
                />
              );
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
