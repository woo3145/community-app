import { RecentlyViewdPost } from '@/interfaces/community';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';

// 최근 본 게시물
export const useMyRecents = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<RecentlyViewdPost[]>('/api/my/recents');

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
