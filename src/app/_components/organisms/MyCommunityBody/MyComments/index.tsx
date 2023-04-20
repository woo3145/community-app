'use client';

import styles from './styles.module.scss';
import { useMyComments } from '@/hooks/scrollSwr/useMyComments';
import { CommentItem } from '@/app/_components/molecules/CommentItem';
import { CommentItemLoading } from '@/app/_components/molecules/CommentItem/Loading';

export const MyComments = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyComments();

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <CommentItemLoading key={i} />;
          })
        : data.map((page) =>
            page.data.map((comment, idx) => {
              return <CommentItem key={idx} comment={comment} isLink />;
            })
          )}
      {isLoading ? (
        <CommentItemLoading />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
};
