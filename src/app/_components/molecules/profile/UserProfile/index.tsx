'use client';

import Link from 'next/link';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';

interface Props {
  profile?: Profile;
  size?: UISize;
}

export const UserProfile = ({ profile, size = 'md' }: Props) => {
  if (!profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.profileBox} ${styles[size]}`}>
        <Avatar src={profile.avatar} size={size} />

        <div className={styles.verticleBox}>
          <div className={styles.user_name}>
            {profile ? (
              <p className={styles.user_name}>
                {profile.nameType ? profile.nickname : profile.name}
              </p>
            ) : (
              <p className={styles.user_name}>탈퇴한 사용자</p>
            )}
          </div>
          <AvatarCareer job={profile.job?.title} annual={profile.annual} />
        </div>
      </div>
    </div>
  );
};
