import { Comments } from '@/libs/server/commentUtils/commentFetchTypes';
import useSWR from 'swr';

interface UseCommentsResponse {
  comments: Comments;
  isLoading: boolean;
  isError: boolean;
}

export const useComments = (postId: number): UseCommentsResponse => {
  const { data, error } = useSWR<{ comments: Comments }>(
    postId ? `/api/posts/${postId}/comments` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('댓글 목록을 불러오지 못했습니다.');
      }
      return response.json();
    }
  );
  if (!postId) {
    return {
      comments: [],
      isLoading: false,
      isError: false,
    };
  }

  return {
    comments: data?.comments || [],
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
