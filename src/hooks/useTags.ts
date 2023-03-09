import useSWR from 'swr';

interface UseTagsReturn {
  tags: ParentTag[];
  subTags: SubTag[];
  isLoading: boolean;
  isError: boolean;
}

export const useTags = (): UseTagsReturn => {
  const { data, error } = useSWR<{ tags: ParentTag[] }>(
    '/api/tags',
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('태그목록을 가져오지 못했습니다.');
      }
      return response.json();
    }
  );
  const subTags: SubTag[] = [];

  if (data?.tags) {
    data.tags.forEach((tag: ParentTag) => {
      subTags.push(...tag.subTags);
    });
  }

  return {
    tags: data?.tags || [],
    subTags: subTags || [],
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
