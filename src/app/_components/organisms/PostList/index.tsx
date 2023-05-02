'use client';

import { usePosts } from '@/hooks/scrollSwr/usePosts';
import { PostItem } from '../../molecules/PostItem';
import styles from './styles.module.scss';

interface Props {
  category: string;
}

export default function PostList({ category }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(category);
  return (
    <div className={styles.container}>
      {isLoading
        ? [1, 2, 3, 4].map((i, idx) => {
            return <PostItem isLoading={isLoading} key={idx} />;
          })
        : data.map((page) =>
            page.data.map((post) => {
              return <PostItem isLoading={false} key={post.id} post={post} />;
            })
          )}
      {isLoading ? (
        <PostItem isLoading={isLoading} />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
}
