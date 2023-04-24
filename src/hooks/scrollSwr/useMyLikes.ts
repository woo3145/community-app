import { LikesPost } from '@/interfaces/community';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 내 좋아요 게시글 불러오기(무한 스크롤)
export const useMyLikes = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<LikesPost[]>(`${API_BASE_URL}/my/likes`);

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
