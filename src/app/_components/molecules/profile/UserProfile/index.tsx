import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import styles from './styles.module.scss';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';

interface Props {
  profile?: Profile;
  size?: UISize;
}

export const UserProfile = ({ profile, size = 'md' }: Props) => {
  if (!profile) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.profileBox} ${styles[size]}`}>
          <Avatar src={''} size={size} />

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
        <Avatar src={profile.avatar || ''} size={size} />

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
