import { Avatar } from '@/app/_common/avatar';
import { CareerBadge } from '@/app/_common/career_badge';
import Link from 'next/link';

import styles from './sideAuthor_box.module.scss';

interface Props {
  author?: IAuthor;
}

export const SideAuthorBox = ({ author }: Props) => {
  return (
    <Link href={`/profile/${author?.id}`} className={styles.wrapper}>
      <div className={styles.authorBox}>
        <div className={styles.avatarWrapper}>
          <Avatar src={''} />
        </div>

        <div className={styles.verticleBox}>
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
      </div>
    </Link>
  );
};
