import { CreateCommentFormValue } from '@/app/_components/molecules/forms/CreateCommentForm';
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

    const response = await (
      await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data.content,
          postId: postId,
        }),
      })
    ).json();

    if (response.error) {
      toast.dismiss(toastId);
      toast.error(response.error);
      setIsApiLoading(false);
      return;
    }

    mutate(`/api/posts/${postId}/comments`); // 게시물 댓글 새로고침
    mutate(`/api/user/${session.user.id}/comments`); // 내 댓글여부 새로고침(임시)
    reset();

    setIsApiLoading(false);
    toast.dismiss(toastId);
  };

  return { onSubmit, isApiLoading };
};
