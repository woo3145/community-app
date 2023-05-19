import { API_BASE_URL } from '@/libs/client/apis';
import useSWR, { KeyedMutator } from 'swr';

interface UsePostIsLikedResponse {
  isLiked: boolean;
  isLoading: boolean;
  isError: boolean;
  updateCache: (isLiked: boolean) => void;
}

// 유저가 해당 게시물에 좋아요를 눌렀는지 여부
export const usePostIsLiked = (
  postId: number,
  userId: string | undefined
): UsePostIsLikedResponse => {
  const { data, error, mutate } = useSWR<{ data: boolean }>(
    postId && userId ? `${API_BASE_URL}/user/${userId}/likes/${postId}` : null
  );
  const updateCache = (isLiked: boolean) => {
    mutate({ data: isLiked });
    mutate();
  };

  if (!postId) {
    return {
      isLiked: false,
      isLoading: false,
      isError: false,
      updateCache,
    };
  }

  return {
    isLiked: data?.data ? data.data : false,
    isLoading: !data && !error,
    isError: error !== undefined,
    updateCache,
  };
};
