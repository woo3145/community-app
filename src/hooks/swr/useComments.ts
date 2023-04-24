import { API_BASE_URL } from '@/libs/client/apis';
import { Comments } from '@/libs/server/commentUtils/commentFetchTypes';
import useSWR from 'swr';

interface UseCommentsResponse {
  comments: Comments;
  count: number;
  isLoading: boolean;
  isError: boolean;
}

// 게시물의 댓글 목록 불러오기
export const useComments = (postId: number): UseCommentsResponse => {
  const { data, error } = useSWR<{ data: Comments }>(
    postId ? `${API_BASE_URL}/posts/${postId}/comments` : null
  );
  if (!postId) {
    return {
      comments: [],
      count: 0,
      isLoading: false,
      isError: false,
    };
  }

  return {
    comments: data?.data || [],
    count: data?.data ? data.data.length : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
