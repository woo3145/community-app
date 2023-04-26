import { API_BASE_URL, _toggleLike } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

// 게시물 좋아요 기능
export const useToggleLike = (postId: number, isLiked: boolean) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const refresh = (postId: number, userId: string) => {
    mutate(`${API_BASE_URL}/posts/${postId}/like`); // 게시글 좋아요 수 새로고침
    mutate(`${API_BASE_URL}/user/${userId}/likes/${postId}`); // 게시물 좋아요 여부 새로고침
  };

  const handleApiLoading = (isLoading: boolean, toastId?: Id | null) => {
    setIsApiLoading(isLoading);
    if (toastId) {
      toast.dismiss(toastId);
    }
  };

  const onClick = async () => {
    let toastId: Id | null = null;
    if (isApiLoading) return;
    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      toastId = toast.loading('처리중 입니다.');
      handleApiLoading(true);

      await _toggleLike(postId, isLiked);
      refresh(postId, session.user.id);
      handleApiLoading(false, toastId);
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
