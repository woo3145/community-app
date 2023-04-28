import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 내 작성글 불러오기(무한 스크롤)
export const useMyPosts = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<Post[]>(`${API_BASE_URL}/my/posts`);

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
    mutate,
  };
};
