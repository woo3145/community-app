'use client';

import { useMyComments } from '@/hooks/scrollSwr/useMyComments';
import { CommentItem } from '@/app/_components/molecules/CommentItem';
import { EmptyMyComments } from '../../_components/EmptyBodyContainer';

export const MyComments = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyComments();

  return (
    <div className="flex flex-col">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i) => {
          return <CommentItem isLoading={isLoading} key={i} />;
        })}
      {data.length === 1 && data[0].data.length === 0 && <EmptyMyComments />}
      {data.length !== 0 &&
        data.map((page) =>
          page.data.map((comment, idx) => {
            return (
              <CommentItem
                isLoading={false}
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
