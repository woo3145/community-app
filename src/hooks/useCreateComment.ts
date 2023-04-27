import { CreateCommentFormValue } from '@/app/_components/forms/CreateCommentForm';
import { API_BASE_URL, _createComment } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

// 댓글 생성
export const useCreateComment = (postId: number, reset: () => void) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutate } = useSWRConfig();

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

  const onSubmit = async (data: CreateCommentFormValue) => {
    let toastId: Id | null = null;
    if (isApiLoading) return;
    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      toastId = toast.loading('처리중 입니다.');
      handleApiLoading(true);

      await _createComment(postId, data.content);

      reset();
      refreshComments(postId, session.user.id);
      handleApiLoading(false, toastId);
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onSubmit, isApiLoading };
};
