'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';
import { useMyPosts } from '@/hooks/scrollSwr/useMyPosts';
import { EmptyMyPosts } from '../../_components/EmptyBodyContainer';

export const MyPosts = () => {
  const { data, isLoading, bottomRef, isReachedEnd } = useMyPosts();
  console.log(isLoading);
  return (
    <div className="flex flex-col">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i) => {
          return <PostItem isLoading={isLoading} key={i} />;
        })}
      {data.length === 1 && data[0].data.length === 0 && <EmptyMyPosts />}
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
