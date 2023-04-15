import { LikesPost } from '@/interfaces/community';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';

// 내 좋아요 게시글 불러오기(무한 스크롤)
export const useMyLikes = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<LikesPost[]>('/api/my/likes');

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
