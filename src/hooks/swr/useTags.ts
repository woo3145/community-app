import { API_BASE_URL } from '@/libs/client/apis';
import useSWR from 'swr';

interface UseTagsReturn {
  tags: ParentTag[];
  subTags: SubTag[];
  isLoading: boolean;
  isError: boolean;
}

// 태그목록 불러오기
export const useTags = (): UseTagsReturn => {
  const { data, error } = useSWR<{ data: ParentTag[] }>(`${API_BASE_URL}/tags`);
  const subTags: SubTag[] = [];

  if (data?.data) {
    data.data.forEach((tag: ParentTag) => {
      subTags.push(...tag.subTags);
    });
  }

  return {
    tags: data?.data || [],
    subTags: subTags,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
