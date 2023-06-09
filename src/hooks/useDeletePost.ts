import { _deleteComment, _deletePost } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';

// 댓글 삭제
export const useDeletePost = (postId: number, callback?: () => void) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);

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

      await _deletePost(postId);

      toast.success('성공적으로 업데이트 되었습니다.');

      handleApiLoading(false, toastId);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onClick, isApiLoading };
};
