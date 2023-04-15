'use client';

import { PostItemLoading } from '@/app/_components/molecules/PostItem/Loading';

import styles from './styles.module.scss';
import { useMyComments } from '@/hooks/scrollSwr/useMyComments';
import { CommentItem } from '@/app/_components/molecules/CommentItem';

export const MyComments = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyComments();

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItemLoading key={i} />;
          })
        : data.map((page) =>
            page.data.map((comment, idx) => {
              return <CommentItem key={idx} comment={comment} isLink />;
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
