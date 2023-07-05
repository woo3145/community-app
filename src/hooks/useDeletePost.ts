import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { _deleteComment, _deletePost } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useCallback, useState } from 'react';
import { useLoadingToast } from './useLoadingToast';

// 내 게시글을 삭제하는 hook
export const useDeletePost = (postId: number, callback?: () => void) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { showLoadingToast, removeLoadingToast } = useLoadingToast();

  const onClick = useCallback(async () => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      setIsLoading(true);
      showLoadingToast();

      await _deletePost(postId);

      toast.success('성공적으로 업데이트 되었습니다.');

      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      setIsLoading(false);
      removeLoadingToast();
    }
  }, [
    isLoading,
    showLoadingToast,
    removeLoadingToast,
    session,
    callback,
    postId,
  ]);

  return { onClick, isLoading };
};
