import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 내가 쓴 댓글목록 불러오기 (무한 스크롤링)
export const useMyComments = () => {
  const { data, bottomRef, mutate, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<Comment[]>(`${API_BASE_URL}/my/comments`);

  return {
    data,
    mutate,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
