import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';

// 유저아이디로 게시물 목록 불러오기(무한 스크롤)
export const useUserPosts = (userId?: string) => {
  const { data, bottomRef, isReachedEnd, isLoading, isError } =
    useInfiniteScrollSWR<Post[]>(`/api/user/${userId}/posts`);

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
  };
};
