import Link from 'next/link';

import styles from './author_box.module.scss';
import { Avatar } from './avatar';
import { CareerBadge } from './career_badge';

interface Props {
  author?: IAuthor;
  createAt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AuthorBox = ({ author, createAt, size = 'md' }: Props) => {
  return (
    <Link href={`/profile/${author?.id}`} className={styles.wrapper}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <div className={styles.avatarWrapper}>
          <Avatar src={''} />
        </div>

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>
              {author ? author.profile.name : '탈퇴한 유저'}
            </p>
            {author && (
              <CareerBadge
                job={author.profile.jobs}
                annual={author.profile.annual}
              />
            )}
          </div>

          {createAt && <div className={styles.createAt}>{createAt}</div>}
        </div>
      </div>
    </Link>
  );
};
