import { PostWithIsLikedAndIsCommented } from '@/interfaces/post';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 게시물(태그로) 목록 불러오기(무한 스크롤)
export const usePosts = (slug?: string) => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<PostWithIsLikedAndIsCommented[]>(
      `${API_BASE_URL}/posts`,
      {
        query: `tag_id=${slug ? slug : ''}`,
      }
    );

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
    mutate,
  };
};
