'use client';

import Link from 'next/link';

import { formatDate } from '@/libs/client/dateUtils';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';

interface Props {
  profile?: Profile;
  createAt?: Date;
  size?: UISize;
}

export const AuthorProfile = ({ profile, createAt, size = 'md' }: Props) => {
  return (
    <Link href={`/profile/${profile?.userId}`} className={styles.wrapper}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <Avatar src={profile?.avatar ? profile.avatar : ''} size={size} />

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            {profile ? (
              <p className={styles.user_name}>
                {profile.nameType ? profile.nickname : profile.name}
              </p>
            ) : (
              <p className={styles.user_name}>탈퇴한 사용자</p>
            )}
            <AvatarCareer job={'개발'} annual={profile?.annual || 0} />
          </div>

          {createAt && (
            <div className={styles.createAt}>{formatDate(createAt)}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
