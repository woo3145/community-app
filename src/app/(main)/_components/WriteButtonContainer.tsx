'use client';

import { Avatar } from '@/app/_components/atoms/Avatar';
import { HiOutlinePencil } from 'react-icons/hi';
import { useMe } from '@/hooks/swr/useMe';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MyProfileModifyModal } from '@/app/_components/modals/MyProfileModifyModal';

export const WriteButtonContainer = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { me, isLoading } = useMe();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onClick = () => {
    if (isLoading) return;
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
    <div>
      {/* Desktop */}
      <div className="items-center justify-center hidden p-8 border-t-0 rounded-none xl:flex card">
        <div className="mr-4 shrink-0">
          <Avatar src={me?.profile.avatar || ''} />
        </div>
        <div
          onClick={onClick}
          className="flex items-center justify-between w-full px-5 py-4 border border-gray-200 border-solid rounded-md cursor-pointer"
          data-cy={'postWrite-button'}
        >
          <span>커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!</span>
          <HiOutlinePencil size={24} />
        </div>
      </div>
      {/* Mobile */}
      <div
        onClick={onClick}
        data-cy={'postWrite-button'}
        className="fixed z-30 flex items-center justify-center w-12 h-12 text-white rounded-full cursor-pointer bottom-8 right-8 bg-primary"
      >
        <HiOutlinePencil size={24} />
      </div>

      {modalIsOpen && me && (
        <MyProfileModifyModal closeModal={closeModal} profile={me.profile} />
      )}
    </div>
  );
};
