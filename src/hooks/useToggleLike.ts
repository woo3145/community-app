import { ApiResponse } from '@/interfaces/api';
import { API_BASE_URL, _toggleLike } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { isErrorResponse } from '@/libs/typeGuards';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

// 게시물 좋아요 기능
export const useToggleLike = (
  postId: number,
  isLiked: boolean,
  userId: string | undefined
) => {
  const [isApiLoading, setIsApiLoading] = useState(false);

  const onClickToggleLike = async () => {
    if (isApiLoading) {
      return;
    }
    if (!userId) {
      return;
    }
    const toastId = toast.loading('처리중 입니다.');
    setIsApiLoading(true);
    try {
      await _toggleLike(postId, isLiked);
      mutate(`${API_BASE_URL}/posts/${postId}/like`); // 게시글 좋아요 수 새로고침
      mutate(`${API_BASE_URL}/user/${userId}/likes/${postId}`); // 게시물 좋아요 여부 새로고침
      toast.dismiss(toastId);
      setIsApiLoading(false);
    } catch (e) {
      errorHandlerWithToast(e);
      toast.dismiss(toastId);
      setIsApiLoading(false);
    }
  };

  return { onClickToggleLike, isApiLoading };
};
