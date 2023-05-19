'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyRecents } from '@/hooks/scrollSwr/useMyRecents';
import { EmptyMyRecents } from '../../_components/EmptyBodyContainer';

export const MyRecents = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyRecents();

  return (
    <div className="flex flex-col">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i) => {
          return <PostItem isLoading={isLoading} key={i} />;
        })}

      {data.length === 1 && data[0].data.length === 0 && <EmptyMyRecents />}
      {data.length !== 0 &&
        data.map((page) =>
          page.data.map((recentlyViewdPost) => {
            return (
              <PostItem
                isLoading={false}
                key={recentlyViewdPost.post.id}
                post={recentlyViewdPost.post}
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
