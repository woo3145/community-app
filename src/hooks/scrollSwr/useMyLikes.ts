import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';
import { Me } from '@/interfaces/user';
import { LikedPost } from '@/interfaces/post';

// 내 좋아요 게시글 불러오기(무한 스크롤)
export const useMyLikes = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<LikedPost[]>(`${API_BASE_URL}/my/likes`);

  const updateUserCache = (newUser: Me) => {
    mutate((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((likePost) => {
            if (newUser.id === likePost.post.userId) {
              likePost.post.user = newUser;
            }
            return likePost;
          }),
        };
      });
    }, false);
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
