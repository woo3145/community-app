import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { API_BASE_URL } from '@/libs/client/apis';

// 유저아이디로 댓글 목록 불러오기(무한 스크롤)
export const useUserComments = (userId?: string) => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<Comment[]>(`${API_BASE_URL}/user/${userId}/comments`);

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
