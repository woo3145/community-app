import { API_BASE_URL } from '@/libs/client/apis';
import useSWR from 'swr';

interface UseCommentsResponse {
  likeCount: number;
  isLoading: boolean;
  isError: boolean;
}

// 게시물의 좋아요 수
export const usePostLikeCount = (postId: number): UseCommentsResponse => {
  const { data, error } = useSWR<{ data: number }>(
    postId ? `${API_BASE_URL}/posts/${postId}/like` : null
  );
  if (!postId) {
    return {
      likeCount: 0,
      isLoading: false,
      isError: false,
    };
  }

  return {
    likeCount: data?.data ? data.data : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
