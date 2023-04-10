import { IoEllipsisHorizontal } from 'react-icons/io5';

import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import styles from './styles.module.scss';

interface Props {
  comment: Comment;
}

const PopupMenu = () => {
  return (
    <div>
      <IoEllipsisHorizontal className={styles.icon} />
    </div>
  );
};

export const CommentItem = ({ comment }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AuthorProfile
          profile={comment.user?.profile}
          createAt={comment.createAt}
          size="sm"
        />
        <PopupMenu />
      </div>
      <div className={styles.content}>{comment.content}</div>
    </div>
  );
};
