'use client';

import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '../../molecules/profile/UserProfile';
import { HiOutlinePencil } from 'react-icons/hi';
import { MyProfileModifyModal } from '@/app/_modals/MyProfileModifyModal';
import { useState } from 'react';
import { useProfile } from '@/hooks/swr/useProfile';

import styles from './styles.module.scss';

export const UserCommunityProfile = ({ userId }: { userId: string }) => {
  const { profile, isLoading } = useProfile(userId);

  if (isLoading || !profile) {
    return <div>로딩 ... </div>;
  }

  return (
    <div className={styles.container}>
      <UserProfile profile={profile} size={'lg'} />
      <div className={styles.description}>{profile.description}</div>
      <div className={styles.tagSection}>
        <p>관심 주제</p>
        <div className={styles.tagList}>
          <Badge text={'개발'} />
          <Badge text={'데이터'} />
          {profile.interestTags.map((tag, idx) => {
            return <Badge key={idx} text={tag.title} />;
          })}
        </div>
      </div>
    </div>
  );
};
