import Button from '@/app/_components/atoms/Button';
import { useComments } from '@/hooks/useComments';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useSWRConfig } from 'swr';

import { MyProfile } from '@/app/_components/molecules/profile/MyProfile';
import { Comment } from '@/app/_components/molecules/CommentItem';

import styles from './styles.module.scss';

interface Props {
  postId: number;
}

interface CreateCommentForm {
  content: string;
}

const EmptyCommentMessage = () => {
  return (
    <div className={styles.emptyMessage}>
      <IoChatbubbleOutline />
      <p>첫 댓글을 남겨주세요.</p>
    </div>
  );
};

export const CommentList = ({ postId }: Props) => {
  const { register, handleSubmit, setValue } = useForm<CreateCommentForm>();
  const { comments, isLoading, isError } = useComments(postId);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = handleSubmit(async (data) => {
    if (isApiLoading) {
      console.log('처리중입니다.');
      return;
    }
    setIsApiLoading(true);
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
      // 에러처리
      return;
    }

    mutate(`/api/posts/${postId}/comments`);
    mutate(`/api/posts/${postId}`);

    setValue('content', '');
    setIsApiLoading(false);
  });

  return (
    <div className={styles.commentsContainer}>
      {comments.length > 0 ? (
        comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })
      ) : (
        <EmptyCommentMessage />
      )}

      <div className={styles.commentWrite}>
        <div className={styles.commentWrite_top}>
          <div className={styles.profileWrapper}>
            <MyProfile size="sm" />
          </div>
        </div>
        <div className={styles.commentWrite_bottom}>
          <form onSubmit={onSubmit}>
            <textarea
              {...register('content', { required: true })}
              placeholder="댓글 남기기"
            />
            <div className={styles.button_wrapper}>
              <Button text="등록" type="submit" size="sm" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
