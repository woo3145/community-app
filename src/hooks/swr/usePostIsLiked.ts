import { API_BASE_URL } from '@/libs/client/apis';
import useSWR, { KeyedMutator } from 'swr';

interface UsePostIsLikedResponse {
  isLiked: boolean;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<{
    data: boolean;
  }>;
}

// 유저가 해당 게시물에 좋아요를 눌렀는지 여부
export const usePostIsLiked = (
  postId: number,
  userId: string | undefined
): UsePostIsLikedResponse => {
  const { data, error, mutate } = useSWR<{ data: boolean }>(
    postId && userId ? `${API_BASE_URL}/user/${userId}/likes/${postId}` : null
  );
  if (!postId) {
    return {
      isLiked: false,
      isLoading: false,
      isError: false,
      mutate,
    };
  }

  return {
    isLiked: data?.data ? data.data : false,
    isLoading: !data && !error,
    isError: error !== undefined,
    mutate,
  };
};
