'use client';

import { EmptyUserPosts } from '@/app/(profile)/_components/EmptyBodyContainer';
import { PostItem } from '@/app/_components/molecules/PostItem/PostListItem';
import { useUserPosts } from '@/hooks/scrollSwr/useUserPosts';

export const UserPosts = ({ userId }: { userId: string }) => {
  const { data, isLoading, bottomRef, isReachedEnd } = useUserPosts(userId);
  return (
    <div className="flex flex-col">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i) => {
          return <PostItem isLoading={isLoading} key={i} />;
        })}
      {data.length === 1 && data[0].data.length === 0 && <EmptyUserPosts />}
      {data.length !== 0 &&
        data.map((page) =>
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
