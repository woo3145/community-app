'use client';

import { usePosts } from '@/hooks/usePosts';

import { PostItem } from '../../molecules/PostItem';

import styles from './styles.module.scss';

interface Props {
  category: string;
}

export default function PostList({ category }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(category);

  return (
    <div className={styles.container}>
      {data.map((page) =>
        page.posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })
      )}
      {isLoading ? (
        <div>loading..</div>
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
}
