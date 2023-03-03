'use client';

import { Avatar } from '@/app/_common/avatar';
import { CareerBadge } from '@/app/_common/profile/career_badge';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';

import styles from './user_profile.module.scss';

interface Props {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserProfile = ({ userId, size = 'md' }: Props) => {
  const { profile, isLoading, isError } = useProfile(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <Link href={`/profile/${profile.userId}`} className={styles.wrapper}>
      <div className={`${styles.profileBox} ${styles[size]}`}>
        <div className={styles.avatarWrapper}>
          <Avatar src={profile.avatar} />
        </div>

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>{profile?.name}</p>
          <CareerBadge job={'개발'} annual={profile.annual} />
        </div>
      </div>
    </Link>
  );
};
