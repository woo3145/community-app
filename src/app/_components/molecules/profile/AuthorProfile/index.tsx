import Link from 'next/link';

import { formatDate } from '@/libs/client/dateUtils';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';

interface Props {
  profile?: Profile;
  createAt?: Date;
  size?: UISize;
}

export const AuthorProfile = ({ profile, createAt, size = 'md' }: Props) => {
  if (!profile) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.authorBox} ${styles[size]}`}>
          <Avatar src={''} size={size} />

          <div className={styles.verticleBox}>
            <div className={styles.userInfo}>
              <p className={styles.user_name}>탈퇴한 사용자</p>
            </div>

            {createAt && (
              <div className={styles.createAt}>{formatDate(createAt)}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link href={`/profile/${profile?.userId}`} className={styles.wrapper}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <Avatar src={profile.avatar || ''} size={size} />

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>
              {profile.nameType ? profile.nickname : profile.name}
            </p>

            <AvatarCareer
              job={profile.job?.title || ''}
              annual={profile.annual}
            />
          </div>

          {createAt && (
            <div className={styles.createAt}>{formatDate(createAt)}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
