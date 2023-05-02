'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyRecents } from '@/hooks/scrollSwr/useMyRecents';

import styles from './styles.module.scss';

export const MyRecents = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyRecents();

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItem isLoading={isLoading} key={i} />;
          })
        : data.map((page) =>
            page.data.map((recentlyViewdPost) => {
              return (
                <PostItem
                  isLoading={false}
                  key={recentlyViewdPost.post.id}
                  post={recentlyViewdPost.post}
                />
              );
            })
          )}
      {isLoading ? (
        <PostItem isLoading={isLoading} />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
};
