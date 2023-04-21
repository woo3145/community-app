'use client';

import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '../../molecules/profile/UserProfile';
import { HiOutlinePencil } from 'react-icons/hi';
import { MyProfileModifyModal } from '@/app/_modals/MyProfileModifyModal';
import { useState } from 'react';
import { useMe } from '@/hooks/swr/useMe';

import styles from './styles.module.scss';

export const MyCommunityProfile = () => {
  const { me, isLoading } = useMe();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };

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
          <Badge text={'개발'} />
          <Badge text={'데이터'} />
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
          setIsOpen={setIsOpen}
          profile={me.profile}
        />
      )}
    </div>
  );
};
