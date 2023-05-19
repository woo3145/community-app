import { CreateCommentFormValue } from '@/app/_components/forms/CreateCommentForm';
import { _createComment, _createPost } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { useComments } from './swr/useComments';
import { useMyComments } from './scrollSwr/useMyComments';
import { mergeNewlines } from '@/libs/textareaHelper';

// 댓글 생성
export const useCreateComment = (postId: number, reset: () => void) => {
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { updateCreatedCache: updateCreatedCacheInComments } =
    useComments(postId);
  const { updateCreatedCache: updateCreatedCacheInMyComments } =
    useMyComments();

  // 생성된 댓글 캐시 업데이트
  const updateCache = (newComment: Comment) => {
    // 게시물 댓글 캐시
    updateCreatedCacheInComments(newComment);
    // 내 댓글 캐시
    updateCreatedCacheInMyComments(newComment);
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
      if (!data.content) {
        throw new Error('내용을 입력해 주세요.');
      }

      toastId = toast.loading('처리중 입니다.');
      handleApiLoading(true);
      const mergedContents = mergeNewlines(data.content);
      const res = await _createComment(postId, mergedContents);

      reset();
      updateCache(res.data);
      handleApiLoading(false, toastId);
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onSubmit, isApiLoading };
};
