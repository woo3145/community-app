import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';

// 게시물(태그로) 목록 불러오기(무한 스크롤)
export const usePosts = (slug?: string) => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<Post[]>('/api/posts', {
      query: `tag_id=${slug ? slug : ''}`,
    });

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
