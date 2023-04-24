import { API_BASE_URL, _deleteComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

// 댓글 삭제
export const useDeleteComment = (comment: Comment, callback?: () => void) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [apiLoading, setApiLoading] = useState(false);

  const onClick = async () => {
    if (apiLoading) return;
    if (!session?.user || session.user.id !== comment.userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    const toastId = toast.loading('처리중 입니다.');
    setApiLoading(true);

    try {
      await _deleteComment(comment.id);

      toast.success('성공적으로 업데이트 되었습니다.');
      mutate(`${API_BASE_URL}/posts/${comment.postId}/comments`);
      toast.dismiss(toastId);
      setApiLoading(false);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      toast.dismiss(toastId);
      setApiLoading(false);
    }
  };

  return { onClick, apiLoading };
};
