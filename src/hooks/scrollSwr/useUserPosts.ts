import { PostWithIsLikedAndIsCommented } from '@/interfaces/post';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';

// 유저아이디로 게시물 목록 불러오기(무한 스크롤)
export const useUserPosts = (userId?: string) => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<PostWithIsLikedAndIsCommented[]>(
      `${API_BASE_URL}/user/${userId}/posts`
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
