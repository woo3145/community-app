'use client';

import { Avatar } from '@/app/_components/atoms/Avatar';
import { HiOutlinePencil } from 'react-icons/hi';
import { useMe } from '@/hooks/swr/useMe';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MyProfileModifyModal } from '@/app/_components/modals/MyProfileModifyModal';

export const WriteButton = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { me } = useMe();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onClick = () => {
    if (me && me.profile.nameType === false) {
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
    <div className="flex items-center justify-center p-8 card rounded-none">
      <div className="mr-4">
        <Avatar src={me?.profile.avatar || ''} />
      </div>
      <div
        onClick={onClick}
        className="flex items-center justify-between w-full border border-solid border-gray-200 px-5 py-4 rounded-md cursor-pointer"
        data-cy={'postWrite-button'}
      >
        <span>커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!</span>
        <HiOutlinePencil size={24} />
      </div>
      {modalIsOpen && me && (
        <MyProfileModifyModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          profile={me.profile}
        />
      )}
    </div>
  );
};
