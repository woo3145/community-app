'use client';

import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';

import styles from './author_profile.module.scss';
import { Avatar } from '../avatar';
import { CareerBadge } from './career_badge';
import { DeletedProfile } from './deleted_profile';

interface Props {
  userId?: string;
  createAt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AuthorProfile = ({ userId, createAt, size = 'md' }: Props) => {
  const { profile, isLoading, isError } = useProfile(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !profile) {
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

          {createAt && <div className={styles.createAt}>{createAt}</div>}
        </div>
      </div>
    </Link>
  );
};
