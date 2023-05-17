'use client';

import Button from '@/app/_components/atoms/Button';
import { useForm } from 'react-hook-form';
import { useCreateComment } from '@/hooks/useCreateComment';
import { useMe } from '@/hooks/swr/useMe';

export interface CreateCommentFormValue {
  content: string;
}

interface Props {
  postId: number;
}

export const CreateCommentForm = ({ postId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CreateCommentFormValue>();
  const { me } = useMe();
  const { onSubmit, isApiLoading } = useCreateComment(postId, reset);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <textarea
        {...register('content', { required: true })}
        placeholder={me ? '댓글 남기기' : '로그인 후 댓글 남기기'}
        className="w-full resize-none border-none p-4"
        disabled={!me}
      />
      <div className="flex justify-end pt-5">
        <Button
          text="등록"
          type="submit"
          uiSize="sm"
          isValid={isValid && !isApiLoading}
        />
      </div>
    </form>
  );
};
