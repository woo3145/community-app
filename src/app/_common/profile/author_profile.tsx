'use client';

import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';

import styles from './author_profile.module.scss';
import { Avatar } from '../avatar';
import { CareerBadge } from './career_badge';
import { DeletedProfile } from './deleted_profile';
import { formatDate } from '@/libs/client/dateUtils';

interface Props {
  profile?: Profile;
  createAt?: Date;
  size?: 'sm' | 'md' | 'lg';
}

export const AuthorProfile = ({ profile, createAt, size = 'md' }: Props) => {
  if (!profile) {
    return <DeletedProfile size={size} />;
  }
  return (
    <Link href={`/profile/${profile.userId}`} className={styles.wrapper}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <div className={styles.avatarWrapper}>
          <Avatar src={profile.avatar} />
        </div>

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>{profile.name}</p>
            <CareerBadge job={'개발'} annual={profile?.annual || 0} />
          </div>

          {createAt && (
            <div className={styles.createAt}>{formatDate(createAt)}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
