import { API_BASE_URL } from '@/libs/client/apis';
import useSWR, { KeyedMutator } from 'swr';

interface UseCommentsResponse {
  likeCount: number;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<{
    data: number;
  }>;
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
      mutate,
    };
  }

  return {
    likeCount: data?.data ? data.data : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
    mutate,
  };
};
