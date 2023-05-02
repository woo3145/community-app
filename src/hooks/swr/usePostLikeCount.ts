import { API_BASE_URL } from '@/libs/client/apis';
import useSWR, { KeyedMutator } from 'swr';

interface UseCommentsResponse {
  likeCount: number;
  isLoading: boolean;
  isError: boolean;
  updateCache: (isLiked: boolean) => void;
}

// 게시물의 좋아요 수
export const usePostLikeCount = (postId: number): UseCommentsResponse => {
  const { data, error, mutate } = useSWR<{ data: number }>(
    postId ? `${API_BASE_URL}/posts/${postId}/like` : null
  );
  if (!postId) {
    return {
      likeCount: 0,
      isLoading: false,
      isError: false,
      updateCache: (isLiked: boolean) => {},
    };
  }

  const updateCache = (isLiked: boolean) => {
    // 현재 좋아요 상태를 기준으로 업데이트
    mutate((oldData) => {
      if (!oldData) return;
      return { data: isLiked ? oldData.data - 1 : oldData.data + 1 };
    });
  };

  return {
    likeCount: data?.data ? data.data : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
    updateCache,
  };
};
