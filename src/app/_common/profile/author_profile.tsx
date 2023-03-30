'use client';

import Link from 'next/link';

import styles from './author_profile.module.scss';
import { DeletedProfile } from './deleted_profile';
import { formatDate } from '@/libs/client/dateUtils';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';

interface Props {
  profile?: Profile;
  createAt?: Date;
  size?: UISize;
}

export const AuthorProfile = ({ profile, createAt, size = 'md' }: Props) => {
  if (!profile) {
    return <DeletedProfile size={size} />;
  }
  return (
    <Link href={`/profile/${profile.userId}`} className={styles.wrapper}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <Avatar src={profile.avatar} size={size} />

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>
              {profile.nameType ? profile.nickname : profile.name}
            </p>
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
