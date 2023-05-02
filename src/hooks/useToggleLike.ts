import { _toggleLike } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { usePostIsLiked } from './swr/usePostIsLiked';
import { usePostLikeCount } from './swr/usePostLikeCount';

// 게시물 좋아요 기능
export const useToggleLike = (postId: number, isLiked: boolean) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { updateCache: updatePostIsLiked } = usePostIsLiked(
    postId,
    session?.user.id
  );
  const { updateCache: updatePostLikeCount } = usePostLikeCount(postId);

  // 좋아요 상태 캐시 업데이트
  const updateCache = (isLiked: boolean) => {
    updatePostIsLiked(!isLiked); // 게시물 좋아요 여부
    updatePostLikeCount(isLiked); // 게시물 좋아요 수
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
      updateCache(isLiked);
      handleApiLoading(false, toastId);
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
