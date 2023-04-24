import { CreateCommentFormValue } from '@/app/_components/molecules/forms/CreateCommentForm';
import { API_BASE_URL, _createComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

// 댓글 생성
export const useCreateComment = (postId: number, reset: () => void) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async (data: CreateCommentFormValue) => {
    if (!session?.user) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    if (isApiLoading) {
      return;
    }
    setIsApiLoading(true);
    const toastId = toast.loading('처리중 입니다.');

    try {
      await _createComment(postId, data.content);

      mutate(`${API_BASE_URL}/posts/${postId}/comments`); // 게시물 댓글 새로고침
      mutate(`${API_BASE_URL}/user/${session.user.id}/comments`); // 내 댓글여부 새로고침(임시)
      reset();

      toast.dismiss(toastId);
      setIsApiLoading(false);
    } catch (e) {
      errorHandlerWithToast(e);
      toast.dismiss(toastId);
      setIsApiLoading(false);
    }
  };

  return { onSubmit, isApiLoading };
};
