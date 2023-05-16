'use client';

import { usePosts } from '@/hooks/scrollSwr/usePosts';
import { PostItem } from '../../molecules/PostItem';
import { IoChatbubbleOutline } from 'react-icons/io5';

interface Props {
  category: string;
}

const EmptyPostContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IoChatbubbleOutline className="text-6xl mb-3 text-primary" />
      <p className="text-sm text-gray-500">등록된 게시물이 없습니다.</p>
      <p className="text-sm text-gray-500">첫번째 게시물을 작성해 보세요!</p>
    </div>
  );
};

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
