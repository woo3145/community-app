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
      count: 0,
      isLoading: false,
      isError: false,
    };
  }

  return {
    comments: data?.comments || [],
    count: data?.comments ? data.comments.length : 0,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
