import { RecentlyViewdPost } from '@/interfaces/community';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 최근 본 게시물
export const useMyRecents = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<RecentlyViewdPost[]>(`${API_BASE_URL}/my/recents`);

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
    mutate,
  };
};
