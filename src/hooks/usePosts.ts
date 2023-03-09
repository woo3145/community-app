import useSWR from 'swr';

interface UsePostsReturn {
  posts: Article[];
  isLoading: boolean;
  isError: boolean;
}

export const usePosts = (slug?: string): UsePostsReturn => {
  const { data, error } = useSWR<{ posts: Article[] }>(
    slug ? `/api/posts?tag_id=${slug}` : '/api/posts',
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('태그목록을 가져오지 못했습니다.');
      }
      return response.json();
    }
  );

  return {
    posts: data?.posts || [],
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
