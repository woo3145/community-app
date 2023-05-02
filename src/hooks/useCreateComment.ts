import { CreateCommentFormValue } from '@/app/_components/forms/CreateCommentForm';
import { _createComment, _createPost } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useComments } from './swr/useComments';
import { useMyComments } from './scrollSwr/useMyComments';

// 댓글 생성
export const useCreateComment = (postId: number, reset: () => void) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutate: mutateComments } = useComments(postId);
  const { mutate: mutateMyComments } = useMyComments();

  const refreshComments = (newComment: Comment) => {
    // 게시물 댓글 새로고침
    mutateComments((oldData) => {
      if (!oldData) return;
      return {
        data: [...oldData.data, newComment],
      };
    });
    // 내 댓글여부 새로고침
    mutateMyComments((oldData) => {
      if (!oldData) return;
      return oldData.map((page, idx) => {
        if (idx === 0) {
          return {
            data: [newComment, ...page.data],
          };
        }
        return page;
      });
    });
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

      const res = await _createComment(postId, data.content);

      reset();
      refreshComments(res.data);
      handleApiLoading(false, toastId);
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onSubmit, isApiLoading };
};
