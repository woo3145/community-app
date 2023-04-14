'use client';

import Button from '@/app/_components/atoms/Button';
import { useForm } from 'react-hook-form';
import { useCreateComment } from '@/hooks/useCreateComment';

import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const { onSubmit, isApiLoading } = useCreateComment(
    postId,
    session?.user.id,
    reset
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <textarea
        {...register('content', { required: true })}
        placeholder="댓글 남기기"
      />
      <div className={styles.button_wrapper}>
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
