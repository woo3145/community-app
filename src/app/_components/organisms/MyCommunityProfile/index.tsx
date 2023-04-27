'use client';

import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '../../molecules/profile/UserProfile';
import { HiOutlinePencil } from 'react-icons/hi';
import { MyProfileModifyModal } from '@/app/_modals/MyProfileModifyModal';
import { useMe } from '@/hooks/swr/useMe';
import { useModalVisible } from '@/hooks/useModalVisible';

import styles from './styles.module.scss';

export const MyCommunityProfile = () => {
  const { me, isLoading } = useMe();
  const { modalIsOpen, openModal, closeModal } = useModalVisible();
  if (isLoading || !me) {
    return <div>로딩 ... </div>;
  }

  return (
    <div className={styles.container}>
      <UserProfile profile={me.profile} size={'lg'} />
      <div className={styles.description}>{me.profile.description}</div>
      <div className={styles.tagSection}>
        <p>관심 주제</p>
        <div className={styles.tagList}>
          <Badge text={'개발'} /> {/* 임시 */}
          <Badge text={'데이터'} /> {/* 임시 */}
          {me.profile.interestTags.map((tag, idx) => {
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
          closeModal={closeModal}
          profile={me.profile}
        />
      )}
    </div>
  );
};
