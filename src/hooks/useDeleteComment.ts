import { useSession } from 'next-auth/react';

import { toast } from 'react-toastify';

import { _deleteComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/interfaces/comment';
import { useMyComments } from './scrollSwr/useMyComments';
import { useComments } from './swr/useComments';
import { useUserComments } from './scrollSwr/userUserComments';
import { useApiLoading } from './useApiLoading';

// 댓글 삭제
export const useDeleteComment = (comment: Comment, callback?: () => void) => {
  const { data: session } = useSession();
  const { updateDeletedCache: updateDeletedCacheInMyComments } =
    useMyComments();
  const { updateDeletedCache: updateDeletedCacheInComments } = useComments(
    comment.postId
  );
  const { updateDeletedCache: updateDeletedCacheInUserComments } =
    useUserComments(session?.user.id);
  const { startLoading, finishLoading, isLoading } = useApiLoading({
    showToast: true,
  });

  // 댓글 삭제 캐시 업데이트
  const updateCache = (deletedCommentId: number) => {
    // 내 댓글
    updateDeletedCacheInMyComments(deletedCommentId);
    // 유저 댓글
    updateDeletedCacheInUserComments(deletedCommentId);
    // 게시물 댓글
    updateDeletedCacheInComments(deletedCommentId);
  };

  const onClick = async () => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      startLoading();

      await _deleteComment(comment.id);

      toast.success('성공적으로 업데이트 되었습니다.');
      updateCache(comment.id);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      finishLoading();
    }
  };

  return { onClick, isApiLoading: isLoading };
};
