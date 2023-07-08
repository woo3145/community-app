'use client';

import { EmptyUserComments } from '@/app/(profile)/_components/EmptyBodyContainer';
import { CommentItem } from '@/app/_components/molecules/CommentItem/CommentItem';
import { useUserComments } from '@/hooks/scrollSwr/userUserComments';

export const UserComments = ({ userId }: { userId: string }) => {
  const { data, isLoading, bottomRef, isReachedEnd } = useUserComments(userId);

  return (
    <div className="flex flex-col">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i) => {
          return <CommentItem isLoading={isLoading} key={i} />;
        })}

      {data.length === 1 && data[0].data.length === 0 && <EmptyUserComments />}
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
