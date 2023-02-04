import Link from 'next/link';
import { IoChevronForwardOutline } from 'react-icons/io5';
import styles from './myCommunityProfile.module.scss';

export const MyCommunityProfile = () => {
  return (
    <div className={styles.myProfile}>
      <p>MY 커뮤니티</p>
      <Link href="/login" className={styles.loginButton}>
        <div className={styles.userAvatar}></div>
        <span>로그인 해주세요</span>
        <IoChevronForwardOutline />
      </Link>
    </div>
  );
};
