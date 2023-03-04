import { AuthorProfile } from '@/app/_common/profile/author_profile';
import { MyProfile } from '@/app/_common/profile/my_profile';
import { useComments } from '@/hooks/useComments';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { Comment } from './comment';

import styles from './commentsContainer.module.scss';

interface Props {
  postId: number;
}

const EmptyCommentMessage = () => {
  return (
    <div className={styles.emptyMessage}>
      <IoChatbubbleOutline />
      <p>첫 댓글을 남겨주세요.</p>
    </div>
  );
};

export const CommentsContainer = ({ postId }: Props) => {
  const { comments, isLoading, isError } = useComments(postId);
  console.log(comments);
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
          <form>
            <textarea placeholder="댓글 남기기" />
            <div className={styles.button_wrapper}>
              <button>등록</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
