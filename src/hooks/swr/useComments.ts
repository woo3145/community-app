import { API_BASE_URL } from '@/libs/client/apis';
import {
  Comment,
  Comments,
} from '@/libs/server/commentUtils/commentFetchTypes';
import useSWR, { KeyedMutator } from 'swr';

interface UseCommentsResponse {
  comments: Comments;
  count: number;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<{
    data: Comment[];
  }>;
}

// 게시물의 댓글 목록 불러오기
export const useComments = (postId?: number | null): UseCommentsResponse => {
  const { data, error, mutate } = useSWR<{ data: Comment[] }>(
    postId ? `${API_BASE_URL}/posts/${postId}/comments` : null
  );
  if (!postId) {
    return {
      comments: [],
      count: 0,
      isLoading: false,
      isError: false,
      mutate,
    };
  }

  return {
    comments: data?.data || [],
    count: data?.data ? data.data.length : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
    mutate,
  };
};
