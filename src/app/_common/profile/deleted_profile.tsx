import { Avatar } from '@/app/_common/avatar';

import styles from './user_profile.module.scss';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

export const DeletedProfile = ({ size = 'md' }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.profileBox}  ${styles[size]}`}>
        <div className={styles.avatarWrapper}>
          <Avatar src={''} />
        </div>

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>탈퇴한 사용자</p>
        </div>
      </div>
    </div>
  );
};
