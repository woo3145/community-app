import { _deleteComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useMyComments } from './scrollSwr/useMyComments';
import { useComments } from './swr/useComments';
import { useUserComments } from './scrollSwr/userUserComments';
import { Comment } from '@/interfaces/comment';

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
  const [isApiLoading, setIsApiLoading] = useState(false);

  // 댓글 삭제 캐시 업데이트
  const updateCache = (deletedCommentId: number) => {
    // 내 댓글
    updateDeletedCacheInMyComments(deletedCommentId);
    // 유저 댓글
    updateDeletedCacheInUserComments(deletedCommentId);
    // 게시물 댓글
    updateDeletedCacheInComments(deletedCommentId);
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

      await _deleteComment(comment.id);

      toast.success('성공적으로 업데이트 되었습니다.');
      updateCache(comment.id);
      handleApiLoading(false, toastId);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
