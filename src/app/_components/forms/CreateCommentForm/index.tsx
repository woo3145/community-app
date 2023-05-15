'use client';

import Button from '@/app/_components/atoms/Button';
import { useForm } from 'react-hook-form';
import { useCreateComment } from '@/hooks/useCreateComment';

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
  const { onSubmit, isApiLoading } = useCreateComment(postId, reset);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <textarea
        {...register('content', { required: true })}
        placeholder="댓글 남기기"
        className="w-full resize-none border-none p-4"
      />
      <div className="flex justify-end pt-5">
        <Button
          text="등록"
          type="submit"
          size="sm"
          isValid={isValid && !isApiLoading}
        />
      </div>
    </form>
  );
};
