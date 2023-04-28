import { _deleteComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useMyComments } from './scrollSwr/useMyComments';
import { useComments } from './swr/useComments';
import { useUserComments } from './scrollSwr/userUserComments';

// 댓글 삭제
export const useDeleteComment = (comment: Comment, callback?: () => void) => {
  const { data: session } = useSession();
  const { mutate: mutateMyComments } = useMyComments();
  const { mutate: mutateComments } = useComments(comment.postId);
  const { mutate: mutateUserComments } = useUserComments(session?.user.id);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const refreshComments = (deletedCommentId: number) => {
    // 삭제한 댓글 캐시 업데이트
    mutateMyComments((oldData) => {
      if (!oldData) return;
      return oldData.filter((page) =>
        page.data.filter((c) => c.id != deletedCommentId)
      );
    });
    mutateUserComments((oldData) => {
      if (!oldData) return;
      return oldData.filter((page) =>
        page.data.filter((c) => c.id != deletedCommentId)
      );
    });
    // 게시물 댓글 새로고침
    mutateComments((oldData) => {
      if (!oldData) return;
      return {
        data: oldData?.data.filter((c) => c.id !== deletedCommentId),
      };
    });
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
      refreshComments(comment.id);
      handleApiLoading(false, toastId);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
