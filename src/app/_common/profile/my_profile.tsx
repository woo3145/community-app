'use client';

import { Avatar } from '@/app/_common/avatar';
import { CareerBadge } from '@/app/_common/profile/career_badge';
import { useMe } from '@/hooks/useMe';
import Link from 'next/link';
import { IoChevronForwardOutline } from 'react-icons/io5';

import styles from './my_profile.module.scss';

export const MyProfile = () => {
  const { me, isLoading, isError } = useMe();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !me) {
    return (
      <Link href="/login" className={styles.loginButton}>
        <div className={styles.avatarWrapper}>
          <Avatar src={''} />
        </div>
        <span>로그인 해주세요</span>
        <IoChevronForwardOutline />
      </Link>
    );
  }

  return (
    <Link href={'/my/recents'} className={styles.myCommunityButton}>
      <div className={styles.authorBox}>
        <div className={styles.avatarWrapper}>
          <Avatar src={me.profile.avatar} />
        </div>

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>
            {me.profile.name ? me.profile.name : '이름을 설정해주세요'}
          </p>
          <CareerBadge job={'개발'} annual={me.profile.annual} />
        </div>
      </div>
      <IoChevronForwardOutline />
    </Link>
  );
};
