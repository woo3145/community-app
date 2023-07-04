import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { _deleteComment, _deletePost } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useApiLoading } from './useApiLoading';

// 댓글 삭제
export const useDeletePost = (postId: number, callback?: () => void) => {
  const { data: session } = useSession();
  const { startLoading, finishLoading, isLoading } = useApiLoading({
    showToast: true,
  });

  const onClick = async () => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      startLoading();

      await _deletePost(postId);

      toast.success('성공적으로 업데이트 되었습니다.');

      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      finishLoading();
    }
  };

  return { onClick, isApiLoading: isLoading };
};
