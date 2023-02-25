import { Avatar } from '@/app/_common/avatar';
import { CareerBadge } from '@/app/_common/career_badge';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { IoChevronForwardOutline } from 'react-icons/io5';
import styles from './myCommunityProfile.module.scss';

export const MyCommunityProfile = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className={styles.myProfile}>
        <p className={styles.title}>MY 커뮤니티</p>
        <Link href="/login" className={styles.loginButton}>
          <div className={styles.avatarWrapper}>
            <Avatar src={''} />
          </div>
          <span>로그인 해주세요</span>
          <IoChevronForwardOutline />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.myProfile}>
      <p className={styles.title}>MY 커뮤니티</p>
      <Link href={'/my/recents'} className={styles.myCommunityButton}>
        <div className={styles.authorBox}>
          <div className={styles.avatarWrapper}>
            <Avatar src={''} />
          </div>

          <div className={styles.verticleBox}>
            <p className={styles.user_name}>
              {session?.user?.name ? session.user.name : '이름을 설정해주세요'}
            </p>
            <CareerBadge job={'개발'} career={'신입'} />
          </div>
        </div>
        <IoChevronForwardOutline />
      </Link>
    </div>
  );
};
