'use client';

import Link from 'next/link';

import { formatDate } from '@/libs/client/dateUtils';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';
import { useMe } from '@/hooks/useMe';
import { IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  arrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MyProfile = ({ arrow = false, size = 'md' }: Props) => {
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
        {arrow && <IoChevronForwardOutline />}
      </Link>
    );
  }

  return (
    <Link href={'/my/recents'} className={styles.myCommunityButton}>
      <div className={`${styles.authorBox} ${styles[size]}`}>
        <Avatar src={me.profile.avatar} size={size} />

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>
            {me.profile.nameType ? me.profile.nickname : me.profile.name}
          </p>
          <AvatarCareer job={'개발'} annual={me.profile.annual} />
        </div>
      </div>
      {arrow && <IoChevronForwardOutline />}
    </Link>
  );
};
