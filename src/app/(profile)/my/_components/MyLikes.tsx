'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyLikes } from '@/hooks/scrollSwr/useMyLikes';
import { EmptyMyLikes } from '../../_components/EmptyBodyContainer';

export const MyLikes = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyLikes();

  return (
    <div className="flex flex-col">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i) => {
          return <PostItem isLoading={isLoading} key={i} />;
        })}
      {data.length === 1 && data[0].data.length === 0 && <EmptyMyLikes />}
      {data.length !== 0 &&
        data.map((page) =>
          page.data.map((likesPost) => {
            return (
              <PostItem
                isLoading={false}
                key={likesPost.post.id}
                post={likesPost.post}
              />
            );
          })
        )}
      {isLoading ? (
        <PostItem isLoading={isLoading} />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
};
