'use client';

import { PostItemLoading } from '@/app/_components/molecules/PostItem/Loading';
import { useMyComments } from '@/hooks/scrollSwr/useMyComments';
import { CommentItem } from '@/app/_components/molecules/CommentItem';

import styles from './styles.module.scss';
import { useUserComments } from '@/hooks/scrollSwr/userUserComments';

export const UserComments = ({ userId }: { userId: string }) => {
  const { data, isLoading, bottomRef, isReachedEnd } = useUserComments(userId);

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
