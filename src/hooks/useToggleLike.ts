import { useSession } from 'next-auth/react';

import { _updatePostLikes } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { usePostIsLiked } from './swr/usePostIsLiked';
import { usePostLikeCount } from './swr/usePostLikeCount';
import { useCallback, useState } from 'react';
import { useLoadingToast } from './useLoadingToast';

// 게시물 좋아요 기능
export const useToggleLike = (postId: number, isLiked: boolean) => {
  const { data: session } = useSession();
  const { updateCache: updatePostIsLiked } = usePostIsLiked(
    postId,
    session?.user.id
  );
  const { updateCache: updatePostLikeCount } = usePostLikeCount(postId);
  const [isLoading, setIsLoading] = useState(false);
  const { showLoadingToast, removeLoadingToast } = useLoadingToast();

  // 좋아요 상태 캐시 업데이트
  const updateCache = useCallback(
    (isLiked: boolean) => {
      updatePostIsLiked(isLiked); // 게시물 좋아요 여부
      updatePostLikeCount(isLiked); // 게시물 좋아요 수
    },
    [updatePostIsLiked, updatePostLikeCount]
  );

  // 현재 게시글 좋아요 상태에서 반전 시킴(toggle)
  const onClick = useCallback(async () => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      setIsLoading(true);
      showLoadingToast();

      await _updatePostLikes(postId, !isLiked);
      updateCache(!isLiked);
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      setIsLoading(false);
      removeLoadingToast();
    }
  }, [
    isLoading,
    showLoadingToast,
    removeLoadingToast,
    session,
    isLiked,
    postId,
    updateCache,
  ]);

  return { onClick, isLoading };
};
