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
  const { onSubmit, isLoading } = useCreateComment(postId, reset);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 card"
      data-cy="createComment-form"
    >
      <textarea
        {...register('content', { required: true })}
        placeholder={me ? '댓글 남기기' : '로그인 후 댓글 남기기'}
        className="w-full p-2 border-none resize-none"
        disabled={!me}
        data-cy="createComment-input"
      />
      <div className="flex justify-end pt-5">
        <Button
          text="등록"
          type="submit"
          uiSize="sm"
          isValid={isValid && !isLoading}
          dataCy="createComment-submit"
        />
      </div>
    </form>
  );
};
