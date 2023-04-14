'use client';

import { useComments } from '@/hooks/useComments';
import { IoChatbubbleOutline } from 'react-icons/io5';

import { MyProfile } from '@/app/_components/molecules/profile/MyProfile';

import styles from './styles.module.scss';
import { CommentItem } from '../../molecules/CommentItem';
import { CreateCommentForm } from '../../molecules/forms/CreateCommentForm';

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
  const { comments, isLoading, isError } = useComments(postId);

  return (
    <div className={styles.commentsContainer}>
      {comments.length > 0 ? (
        comments.map((comment, idx) => {
          return <CommentItem key={idx} comment={comment} />;
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
          <CreateCommentForm postId={postId} />
        </div>
      </div>
    </div>
  );
};
