import useSWR from 'swr';

interface UsePostIsLikedResponse {
  isLiked: boolean;
  isLoading: boolean;
  isError: boolean;
}

// 유저가 해당 게시물에 좋아요를 눌렀는지 여부
export const usePostIsLiked = (
  postId: number,
  userId: string | undefined
): UsePostIsLikedResponse => {
  const { data, error } = useSWR<{ isLiked: boolean }>(
    postId && userId ? `/api/user/${userId}/likes/${postId}` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('정보를 불러오지 못했습니다.');
      }
      return response.json();
    }
  );
  if (!postId) {
    return {
      isLiked: false,
      isLoading: false,
      isError: false,
    };
  }

  return {
    isLiked: data?.isLiked ? data.isLiked : false,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
