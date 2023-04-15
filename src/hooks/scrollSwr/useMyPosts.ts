import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';

// 내 작성글 불러오기(무한 스크롤)
export const useMyPosts = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<Post[]>('/api/my/posts');

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
