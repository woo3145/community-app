'use client';

import { Avatar } from '@/app/_components/atoms/Avatar';
import { HiOutlinePencil } from 'react-icons/hi';
import { useMe } from '@/hooks/swr/useMe';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MyProfileModifyModal } from '@/app/_modals/myProfileModifyModal';

export const WriteButton = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { me } = useMe();
  const openModal = () => {
    setIsOpen(true);
  };
  const onClick = () => {
    if (!me) {
      router.push('/login');
      return;
    }
    if (me.profile.nameType === false) {
      if (
        confirm('해당 이름으로 게시글과 댓글이 등록됩니다. 계속하시겠어요?')
      ) {
        router.push('/write');
      } else {
        openModal();
      }
      return;
    }
    router.push('/write');
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Avatar src={me?.profile.avatar || ''} />
      </div>
      <div onClick={onClick} className={styles.writeButton}>
        <span>커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!</span>
        <HiOutlinePencil size={24} />
      </div>
      {modalIsOpen && me && (
        <MyProfileModifyModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          profile={me.profile}
        />
      )}
    </div>
  );
};
