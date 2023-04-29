'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyLikes } from '@/hooks/scrollSwr/useMyLikes';

import styles from './styles.module.scss';

export const MyLikes = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyLikes();

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItem isLoading={isLoading} key={i} />;
          })
        : data.map((page) =>
            page.data.map((likesPost) => {
              return (
                <PostItem
                  isLoading={isLoading}
                  key={likesPost.post.id}
                  post={likesPost.post}
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
