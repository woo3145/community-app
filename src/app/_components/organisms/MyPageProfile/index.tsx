import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '../../molecules/profile/UserProfile';
import { HiOutlinePencil } from 'react-icons/hi';
import { MyProfileModifyModal } from '@/app/_modals/myProfileModifyModal';
import { useState } from 'react';
import styles from './styles.module.scss';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';

interface Props {
  profile: Exclude<Profile, null>;
}

export const MyPageProfile = ({ profile }: Props) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };

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
      <div className={styles.editButton} onClick={openModal}>
        <HiOutlinePencil />
        <span>수정하기</span>
      </div>
      {modalIsOpen && (
        <MyProfileModifyModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          profile={profile}
        />
      )}
    </div>
  );
};
