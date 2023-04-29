'use client';

import { CommentItem } from '@/app/_components/molecules/CommentItem';
import { useUserComments } from '@/hooks/scrollSwr/userUserComments';

import styles from './styles.module.scss';

export const UserComments = ({ userId }: { userId: string }) => {
  const { data, isLoading, bottomRef, isReachedEnd } = useUserComments(userId);

  return (
    <div className={styles.container}>
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <CommentItem isLoading={isLoading} key={i} />;
          })
        : data.map((page) =>
            page.data.map((comment, idx) => {
              return (
                <CommentItem
                  isLoading={isLoading}
                  key={idx}
                  comment={comment}
                  isLink
                />
              );
            })
          )}
      {isLoading ? (
        <CommentItem isLoading={isLoading} />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
};
