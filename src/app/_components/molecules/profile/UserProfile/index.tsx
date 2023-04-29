import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  profile?: Profile;
  size?: UISize;
}

export const UserProfile = ({
  profile,
  size = 'md',
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.profileBox} ${styles[size]}`}>
          <Avatar isLoading={isLoading} />

          <div className={styles.verticleBox}>
            <div className={styles.user_name}>
              <Skeleton />
            </div>
            <AvatarCareer isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.profileBox} ${styles[size]}`}>
          <Avatar isLoading={isLoading} src={''} size={size} />

          <div className={styles.verticleBox}>
            <div className={styles.user_name}>
              <p className={styles.user_name}>탈퇴한 사용자</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.profileBox} ${styles[size]}`}>
        <Avatar isLoading={isLoading} src={profile.avatar || ''} size={size} />

        <div className={styles.verticleBox}>
          <p className={styles.user_name}>
            {profile.nameType ? profile.nickname : profile.name}
          </p>
          <AvatarCareer
            isLoading={isLoading}
            job={profile.job?.title}
            annual={profile.annual}
          />
        </div>
      </div>
    </div>
  );
};
