import { IoEllipsisHorizontal } from 'react-icons/io5';

import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import styles from './styles.module.scss';
import Link from 'next/link';

interface Props {
  comment: Comment;
  isLink?: boolean;
  isEditButton?: boolean;
}

const PopupMenu = () => {
  return (
    <div>
      <IoEllipsisHorizontal className={styles.icon} />
    </div>
  );
};

export const CommentItem = ({
  comment,
  isLink = false,
  isEditButton = false,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AuthorProfile
          profile={comment.user?.profile}
          createAt={comment.createAt}
          size="sm"
        />
        {isEditButton && <PopupMenu />}
      </div>
      {isLink ? (
        <Link href={`/post/${comment.postId}`}>
          <div className={styles.content}>{comment.content}</div>
        </Link>
      ) : (
        <div className={styles.content}>{comment.content}</div>
      )}
    </div>
  );
};
