import { Avatar } from '@/app/_common/avatar';
import { CareerBadge } from '@/app/_common/career_badge';
import Link from 'next/link';

import styles from './sideAuthor_box.module.scss';

interface Props {
  author: IAuthor;
  href: string;
}

export const SideAuthorBox = ({ author, href }: Props) => {
  return (
    <Link href={href} className={styles.wrapper}>
      <div className={styles.authorBox}>
        <div className={styles.avatarWrapper}>
          <Avatar src={''} />
        </div>

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>{author.name}</p>
          <CareerBadge job={author.job} career={author.career} />
        </div>
      </div>
    </Link>
  );
};
