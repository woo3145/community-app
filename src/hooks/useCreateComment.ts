import { useSession } from 'next-auth/react';

import { CreateCommentFormValue } from '@/app/_components/forms/CreateCommentForm';
import { _createComment, _createPost } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { mergeNewlines } from '@/libs/textareaHelper';
import { Comment } from '@/interfaces/comment';
import { useComments } from './swr/useComments';
import { useMyComments } from './scrollSwr/useMyComments';
import { useApiLoading } from './useApiLoading';

// 댓글 생성
export const useCreateComment = (postId: number, reset: () => void) => {
  const { data: session } = useSession();
  const { startLoading, finishLoading, isLoading } = useApiLoading({
    showToast: true,
  });

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

  const onSubmit = async (data: CreateCommentFormValue) => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      if (!data.content) {
        throw new Error('내용을 입력해 주세요.');
      }
      startLoading();

      const mergedContents = mergeNewlines(data.content);
      const res = await _createComment(postId, mergedContents);

      reset();
      updateCache(res.data);
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      finishLoading();
    }
  };

  return { onSubmit, isApiLoading: isLoading };
};
