'use client';

import Link from 'next/link';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';
import { useMe } from '@/hooks/swr/useMe';
import { IoChevronForwardOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';

interface Props {
  arrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MyProfile = ({ arrow = false, size = 'md' }: Props) => {
  const { me, isLoading, isLoggedIn, isError } = useMe();

  if (isLoading) {
    return (
      <div className={styles.myCommunityButton}>
        <div className={`${styles.authorBox} ${styles[size]}`}>
          <Avatar isLoading={isLoading} size={size} />
          <div className={styles.verticleBox}>
            <Skeleton />
            <AvatarCareer isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !me?.profile) {
    return (
      <Link href="/login" className={styles.loginButton}>
        <div className={styles.avatarWrapper}>
          <Avatar isLoading={isLoading} src={''} />
        </div>
        <span>로그인 해주세요</span>
        {arrow && <IoChevronForwardOutline />}
      </Link>
    );
  }

  return (
    <Link href={'/my'} className={styles.myCommunityButton}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <Avatar
          isLoading={isLoading}
          src={me.profile.avatar || ''}
          size={size}
        />

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>
            {me.profile?.nameType ? me.profile.nickname : me.profile?.name}
          </p>
          <AvatarCareer
            isLoading={isLoading}
            job={me.profile.job?.title}
            annual={me.profile.annual}
          />
        </div>
      </div>
      {arrow && <IoChevronForwardOutline />}
    </Link>
  );
};
