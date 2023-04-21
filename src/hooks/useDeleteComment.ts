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
    const response = await (
      await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      })
    ).json();

    if (response.error) {
      toast.error('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
      toast.dismiss(toastId);
      setApiLoading(false);
      return;
    }
    // 성공
    toast.dismiss(toastId);
    setApiLoading(false);
    toast.success('성공적으로 업데이트 되었습니다.');
    mutate(`/api/posts/${comment.postId}/comments`);
    if (callback) callback();
  };

  return { onClick, apiLoading };
};
