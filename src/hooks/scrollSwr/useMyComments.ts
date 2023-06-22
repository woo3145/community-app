import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';
import { Me } from '@/interfaces/user';
import { Comment } from '@/interfaces/comment';

// 내가 쓴 댓글목록 불러오기 (무한 스크롤링)
export const useMyComments = () => {
  const { data, bottomRef, mutate, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<Comment[]>(`${API_BASE_URL}/my/comments`);

  const updateUserCache = (newUser: Me) => {
    mutate((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((comment) => {
            comment.user = newUser;
            return comment;
          }),
        };
      });
    });
  };

  const updateDeletedCache = (deletedId: number) => {
    mutate((oldData) => {
      if (!oldData) return;
      return oldData.filter((page) =>
        page.data.filter((c) => c.id != deletedId)
      );
    }); // 캐시 업데이트 후 재검증된 데이터 적용
  };

  const updateCreatedCache = (newComment: Comment) => {
    mutate((oldData) => {
      if (!oldData) return;
      return [{ data: [newComment] }, ...oldData];
    }); // 캐시 업데이트 후 재검증된 데이터 적용
  };
  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
    updateUserCache,
    updateDeletedCache,
    updateCreatedCache,
  };
};
