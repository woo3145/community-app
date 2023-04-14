import { Comments } from '@/libs/server/commentUtils/commentFetchTypes';
import useSWR from 'swr';

interface UseCommentsResponse {
  likeCount: number;
  isLoading: boolean;
  isError: boolean;
}

// 게시물의 좋아요 수
export const usePostLikeCount = (postId: number): UseCommentsResponse => {
  const { data, error } = useSWR<{ likeCount: number }>(
    postId ? `/api/posts/${postId}/like` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('좋아요 수를 불러오지 못했습니다.');
      }
      return response.json();
    }
  );
  if (!postId) {
    return {
      likeCount: 0,
      isLoading: false,
      isError: false,
    };
  }

  return {
    likeCount: data?.likeCount ? data.likeCount : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
