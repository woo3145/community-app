import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';
import { Me } from '@/interfaces/user';

// 내 작성글 불러오기(무한 스크롤)
export const useMyPosts = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<Post[]>(`${API_BASE_URL}/my/posts`);

  const updateUserCache = (newUser: Me) => {
    mutate((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((post) => {
            post.user = newUser;
            return post;
          }),
        };
      });
    });
  };

  return {
    data,
    bottomRef,
    isReachedEnd,
    isLoading,
    isError,
    updateUserCache,
  };
};
