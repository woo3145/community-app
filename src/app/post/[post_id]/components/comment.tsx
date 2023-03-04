import { AuthorProfile } from '@/app/_common/profile/author_profile';
import { MyProfile } from '@/app/_common/profile/my_profile';
import { IoChatbubbleOutline, IoEllipsisHorizontal } from 'react-icons/io5';

import styles from './comment.module.scss';

interface Props {
  comment: IComment;
}

const PopupMenu = () => {
  return (
    <div>
      <IoEllipsisHorizontal className={styles.icon} />
    </div>
  );
};

export const Comment = ({ comment }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <AuthorProfile
          userId={comment.userId}
          createAt={comment.createAt}
          size="sm"
        />
        <PopupMenu />
      </div>
      <div className={styles.content}>{comment.content}</div>
    </div>
  );
};
