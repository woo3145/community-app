import useSWR from 'swr';

interface UsePostsReturn {
  post: Article | null;
  isLiked: boolean;
  isLoading: boolean;
  isError: boolean;
}

export const usePost = (postId: number): UsePostsReturn => {
  const { data, error } = useSWR<{ post: Article; isLiked: boolean }>(
    postId ? `/api/posts/${postId}` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('태그목록을 가져오지 못했습니다.');
      }
      return response.json();
    }
  );
  return {
    post: data?.post || null,
    isLiked: data?.isLiked || false,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
