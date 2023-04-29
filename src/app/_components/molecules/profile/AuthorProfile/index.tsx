import Link from 'next/link';
import { formatDate } from '@/libs/client/dateUtils';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.scss';

interface Props {
  isLoading: false;
  profile?: Profile;
  createAt?: Date;
  size?: UISize;
}

export const AuthorProfile = ({
  profile,
  createAt,
  size = 'md',
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <Link href={`/profile/${profile?.userId}`} className={styles.wrapper}>
        <div className={`${styles.authorBox} ${styles[size]}`}>
          <Avatar isLoading={isLoading} size={size} />

          <div className={styles.verticleBox}>
            <div className={styles.userInfo}>
              <Skeleton width={72} height={16} style={{ marginRight: 8 }} />
              <AvatarCareer isLoading={isLoading} />
            </div>
            <Skeleton style={{ marginTop: 4 }} />
          </div>
        </div>
      </Link>
    );
  }
  if (!profile) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.authorBox} ${styles[size]}`}>
          <Avatar isLoading={isLoading} src={''} size={size} />

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
        <Avatar isLoading={isLoading} src={profile.avatar || ''} size={size} />

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>
              {profile.nameType ? profile.nickname : profile.name}
            </p>

            <AvatarCareer
              isLoading={isLoading}
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
