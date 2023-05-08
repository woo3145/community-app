'use client';

import { usePosts } from '@/hooks/scrollSwr/usePosts';
import { PostItem } from '../../molecules/PostItem';
import styles from './styles.module.scss';

interface Props {
  category: string;
}

const EmptyPostContainer = () => {
  return (
    <div className={styles.emptyPostContainer} data-cy={'empty-post-container'}>
      <div className={styles.emptyIcon}>✏️</div>
      <div className={styles.emptyPostText}>
        <p>등록된 게시물이 없습니다.</p>
        <p>첫번째 게시물을 작성해 보세요!</p>
      </div>
    </div>
  );
};

export default function PostList({ category }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(category);
  return (
    <div className={styles.container}>
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i, idx) => {
          return <PostItem isLoading={isLoading} key={idx} />;
        })}
      {!isLoading && data.length !== 0 && data[0].data.length === 0 && (
        <EmptyPostContainer />
      )}
      {data.length !== 0 &&
        data.map((page) =>
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
