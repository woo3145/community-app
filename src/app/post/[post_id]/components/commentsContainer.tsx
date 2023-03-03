import { AuthorProfile } from '@/app/_common/profile/author_profile';
import { IoChatbubbleOutline } from 'react-icons/io5';

import styles from './commentsContainer.module.scss';

export const CommentsContainer = () => {
  return (
    <div className={styles.commentsContainer}>
      <div className={styles.emptyMessage}>
        <IoChatbubbleOutline />
        <p>첫 댓글을 남겨주세요.</p>
      </div>

      <div className={styles.commentWrite}>
        <div className={styles.commentWrite_top}>
          <AuthorProfile userId={undefined} />
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
