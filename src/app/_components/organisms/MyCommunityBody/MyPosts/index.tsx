'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyPosts } from '@/hooks/scrollSwr/useMyPosts';

export const MyPosts = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyPosts();
  return (
    <div className="flex flex-col">
      {data.length === 0 && isLoading
        ? [1, 2, 3, 4].map((i) => {
            return <PostItem isLoading={isLoading} key={i} />;
          })
        : data.map((page) =>
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
};
