import { useSession } from 'next-auth/react';

import { toast } from 'react-toastify';

import { _deleteComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/interfaces/comment';
import { useMyComments } from './scrollSwr/useMyComments';
import { useComments } from './swr/useComments';
import { useUserComments } from './scrollSwr/userUserComments';
import { useCallback, useState } from 'react';
import { useLoadingToast } from './useLoadingToast';

// 내 댓글을 삭제하는 hook
export const useDeleteComment = (comment: Comment, callback?: () => void) => {
  const { data: session } = useSession();
  const { updateDeletedCache: updateDeletedCacheInMyComments } =
    useMyComments();
  const { updateDeletedCache: updateDeletedCacheInComments } = useComments(
    comment.postId
  );
  const { updateDeletedCache: updateDeletedCacheInUserComments } =
    useUserComments(session?.user.id);
  const [isLoading, setIsLoading] = useState(false);
  const { showLoadingToast, removeLoadingToast } = useLoadingToast();

  // 댓글 삭제 캐시 업데이트
  const updateCache = useCallback(
    (deletedCommentId: number) => {
      // 내 댓글
      updateDeletedCacheInMyComments(deletedCommentId);
      // 유저 댓글
      updateDeletedCacheInUserComments(deletedCommentId);
      // 게시물 댓글
      updateDeletedCacheInComments(deletedCommentId);
    },
    [
      updateDeletedCacheInMyComments,
      updateDeletedCacheInUserComments,
      updateDeletedCacheInComments,
    ]
  );

  const onClick = useCallback(async () => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      if (session.user.id !== comment.userId) {
        throw new Error('댓글을 삭제할 권한이 없습니다.');
      }
      setIsLoading(true);
      showLoadingToast();

      await _deleteComment(comment.id);

      toast.success('성공적으로 업데이트 되었습니다.');
      updateCache(comment.id);
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
    callback,
    comment,
    updateCache,
    session,
  ]);

  return { onClick, isLoading };
};
