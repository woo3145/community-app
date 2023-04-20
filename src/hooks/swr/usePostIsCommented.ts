import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import useSWR from 'swr';

interface UsePostIsCommentedResponse {
  isCommented: boolean;
  isLoading: boolean;
  isError: boolean;
}

// 유저가 게시물에 댓글을 달았는지 여부
export const usePostIsCommented = (
  postId: number,
  userId: string | undefined
): UsePostIsCommentedResponse => {
  // 임시: 유저의 댓글들을 모두 가져와 postId와 비교
  const { data, error } = useSWR<{ data: Comment[] }>(
    userId ? `/api/user/${userId}/comments` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('좋아요 수를 불러오지 못했습니다.');
      }
      return response.json();
    }
  );
  if (!userId || !data?.data) {
    return {
      isCommented: false,
      isLoading: false,
      isError: false,
    };
  }
  const isCommented = data.data.some((comment) => comment.postId === postId);

  return {
    isCommented,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
