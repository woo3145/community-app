'use client';

import { usePosts } from '@/hooks/usePosts';

import { PostItem } from '../../molecules/PostItem';

import styles from './styles.module.scss';
import { PostItemLoading } from '../../molecules/PostItem/Loading';

interface Props {
  category: string;
}

export default function PostList({ category }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(category);

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItemLoading key={i} />;
          })
        : data.map((page) =>
            page.posts.map((post) => {
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
}
