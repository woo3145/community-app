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
  const { mutate: mutatePostIsLiked } = usePostIsLiked(
    postId,
    session?.user.id
  );
  const { mutate: mutatePostLikeCount } = usePostLikeCount(postId);

  const refresh = (isLiked: boolean) => {
    mutatePostIsLiked({ data: !isLiked }); // 게시물 좋아요 여부 새로고침
    mutatePostLikeCount((oldData) => {
      if (!oldData) return;
      return { data: isLiked ? oldData.data - 1 : oldData.data + 1 };
    }); // 게시글 좋아요 수 새로고침
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
      refresh(isLiked);
      handleApiLoading(false, toastId);
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
