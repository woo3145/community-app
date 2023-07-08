'use client';

import { usePosts } from '@/hooks/scrollSwr/usePosts';
import { EmptyPostContainer } from './EmptyPostContainer';
import { PostListItem } from '@/app/_components/molecules/PostItem/PostListItem';

interface Props {
  category: string;
}

export default function PostListContainer({ category }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(category);

  return (
    <div className="flex flex-col border-t-0 rounded-t-none card">
      {isLoading &&
        data.length === 0 &&
        [1, 2, 3, 4].map((i, idx) => {
          return <PostListItem isLoading={isLoading} key={idx} />;
        })}
      {!isLoading && data.length !== 0 && data[0].data.length === 0 && (
        <EmptyPostContainer />
      )}
      {data.length !== 0 &&
        data.map((page, i) =>
          page.data.map((post, j) => {
            return (
              <PostListItem
                dataCy={`postCard-${i}-${j}`}
                isLoading={false}
                key={post.id}
                post={post}
              />
            );
          })
        )}

      {isLoading ? (
        <PostListItem isLoading={isLoading} />
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
}
