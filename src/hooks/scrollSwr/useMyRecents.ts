import { RecentlyViewdPost } from '@/interfaces/community';
import { useInfiniteScrollSWR } from './useInfiniteScrollSWR';
import { API_BASE_URL } from '@/libs/client/apis';
import { Me } from '@/interfaces/user';

// 최근 본 게시물
export const useMyRecents = () => {
  const { data, bottomRef, isReachedEnd, isLoading, isError, mutate } =
    useInfiniteScrollSWR<RecentlyViewdPost[]>(`${API_BASE_URL}/my/recents`);

  const updateUserCache = (newUser: Me) => {
    mutate((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((recentlyviewdPost) => {
            if (newUser.id === recentlyviewdPost.post.userId) {
              recentlyviewdPost.post.user = newUser;
            }
            return recentlyviewdPost;
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
