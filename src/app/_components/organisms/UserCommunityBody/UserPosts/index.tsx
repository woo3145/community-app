'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useUserPosts } from '@/hooks/scrollSwr/useUserPosts';

export const UserPosts = ({ userId }: { userId: string }) => {
  const { data, isLoading, bottomRef, isReachedEnd } = useUserPosts(userId);
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
