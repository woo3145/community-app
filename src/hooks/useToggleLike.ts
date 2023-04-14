import { LikePostResponse } from '@/interfaces/api';
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

  const toggleLike = async () => {
    if (isApiLoading) {
      return;
    }
    if (!userId) {
      return;
    }
    const toastId = toast.loading('처리중 입니다.');
    setIsApiLoading(true);
    const response: LikePostResponse = await (
      await fetch(`/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isLiked: isLiked,
        }),
      })
    ).json();

    if (response.error) {
      toast.error('에러가 발생하였습니다.');
      toast.dismiss(toastId);
      setIsApiLoading(false);
      return;
    }
    mutate(`/api/posts/${postId}/like`); // 게시글 좋아요 수 새로고침
    mutate(`/api/user/${userId}/likes/${postId}`); // 게시물 좋아요 여부 새로고침
    toast.dismiss(toastId);
    setIsApiLoading(false);
  };

  return { toggleLike, isApiLoading };
};
