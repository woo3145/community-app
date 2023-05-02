'use client';

import { useComments } from '@/hooks/swr/useComments';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { MyProfile } from '@/app/_components/molecules/profile/MyProfile';
import { CommentItem } from '../../molecules/CommentItem';
import { CreateCommentForm } from '../../forms/CreateCommentForm';

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
  const { comments, isLoading, isError } = useComments(postId);

  return (
    <div className={styles.commentsContainer}>
      {comments.length === 0 &&
        isLoading &&
        [1, 2, 3, 4].map((i) => {
          return <CommentItem key={i} isLoading={isLoading} />;
        })}

      {!isLoading && comments.length === 0 && <EmptyCommentMessage />}

      {comments.map((comment, idx) => {
        return <CommentItem isLoading={false} key={idx} comment={comment} />;
      })}

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
