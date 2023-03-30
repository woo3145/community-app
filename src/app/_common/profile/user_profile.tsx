'use client';

import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import Link from 'next/link';

import styles from './user_profile.module.scss';

interface Props {
  profile?: Profile;
  size?: UISize;
}

export const UserProfile = ({ profile, size = 'md' }: Props) => {
  if (!profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <Link href={`/profile/${profile.userId}`} className={styles.wrapper}>
      <div className={`${styles.profileBox} ${styles[size]}`}>
        <Avatar src={profile.avatar} size={size} />

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>
            {profile.nameType ? profile.nickname : profile.name}
          </p>
          <AvatarCareer job={'개발'} annual={profile.annual} />
        </div>
      </div>
    </Link>
  );
};
