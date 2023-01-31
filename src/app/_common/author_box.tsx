import Link from 'next/link';

import styles from './author_box.module.scss';
import { Avatar } from './avatar';
import { CareerBadge } from './career_badge';

interface Props {
  author: IAuthor;
  createAt?: string;
  href: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AuthorBox = ({ author, createAt, href, size = 'md' }: Props) => {
  return (
    <Link href={href} className={styles.wrapper}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <div className={styles.avatarWrapper}>
          <Avatar src={''} />
        </div>

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>{author.name}</p>
            <CareerBadge job={author.job} career={author.career} />
          </div>

          {createAt && <div className={styles.createAt}>{createAt}</div>}
        </div>
      </div>
    </Link>
  );
};
