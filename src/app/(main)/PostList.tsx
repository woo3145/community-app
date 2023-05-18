'use client';

import { usePosts } from '@/hooks/scrollSwr/usePosts';
import { PostItem } from '../_components/molecules/PostItem';
import { EmptyPostContainer } from './EmptyPostContainer';

interface Props {
  category: string;
}

export default function PostList({ category }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(category);

  return (
    <div className="flex flex-col card border-t-0 rounded-t-none">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i, idx) => {
          return <PostItem isLoading={isLoading} key={idx} />;
        })}
      {!isLoading && data.length !== 0 && data[0].data.length === 0 && (
        <EmptyPostContainer />
      )}
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
}
