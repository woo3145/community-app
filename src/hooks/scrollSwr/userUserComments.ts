import { Comment } from '@/interfaces/comment';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 유저아이디로 댓글 목록 불러오기(무한 스크롤)
export const useUserComments = (userId?: string) => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<Comment[]>(`${API_BASE_URL}/user/${userId}/comments`);

  const updateDeletedCache = (deletedId: number) => {
    mutate((oldData) => {
      if (!oldData) return;
      return oldData.filter((page) =>
        page.data.filter((c) => c.id != deletedId)
      );
    }, false);
  };

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
    updateDeletedCache,
  };
};
