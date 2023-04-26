import { API_BASE_URL, _deleteComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

// 댓글 삭제
export const useDeleteComment = (comment: Comment, callback?: () => void) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const refreshComments = (postId: number, userId: string) => {
    mutate(`${API_BASE_URL}/posts/${postId}/comments`); // 게시물 댓글 새로고침
    mutate(`${API_BASE_URL}/user/${userId}/comments`); // 내 댓글여부 새로고침
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
      if (comment.postId) refreshComments(comment.postId, session.user.id);
      handleApiLoading(false, toastId);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
