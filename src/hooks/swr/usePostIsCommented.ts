import { Comment } from '@/interfaces/comment';
import { API_BASE_URL } from '@/libs/client/apis';
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
    userId ? `${API_BASE_URL}/user/${userId}/comments` : null
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
