import { Comment, Comments } from '@/interfaces/comment';
import { API_BASE_URL } from '@/libs/client/apis';
import useSWR from 'swr';

interface UseCommentsResponse {
  comments: Comments;
  count: number;
  isLoading: boolean;
  isError: boolean;
  updateDeletedCache: (deletedId: number) => void;
  updateCreatedCache: (newComment: Comment) => void;
}

// 게시물의 댓글 목록 불러오기
export const useComments = (postId?: number | null): UseCommentsResponse => {
  const { data, error, mutate } = useSWR<{ data: Comment[] }>(
    postId ? `${API_BASE_URL}/posts/${postId}/comments` : null
  );
  const updateDeletedCache = (deletedId: number) => {
    mutate((oldData) => {
      if (!oldData) return;
      return {
        data: oldData?.data.filter((c) => c.id !== deletedId),
      };
    });
    mutate();
  };

  const updateCreatedCache = (newComment: Comment) => {
    mutate((oldData) => {
      if (!oldData) return;
      return {
        data: [...oldData.data, newComment],
      };
    });
    mutate();
  };

  if (!postId) {
    return {
      comments: [],
      count: 0,
      isLoading: false,
      isError: false,
      updateDeletedCache,
      updateCreatedCache,
    };
  }

  return {
    comments: data?.data || [],
    count: data?.data ? data.data.length : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
    updateDeletedCache,
    updateCreatedCache,
  };
};
