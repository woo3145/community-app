'use client';

import Badge from '@/app/_components/atoms/Badge';
import { HiOutlinePencil } from 'react-icons/hi';
import { MyProfileModifyModal } from '@/app/_modals/MyProfileModifyModal';
import { useMe } from '@/hooks/swr/useMe';
import { useModalVisible } from '@/hooks/useModalVisible';

import { Avatar } from '../../atoms/Avatar';
import { AvatarCareer } from '../../atoms/AvatarCareer';

export const MyCommunityProfile = () => {
  const { me, isLoading } = useMe();
  const { modalIsOpen, openModal, closeModal } = useModalVisible();
  if (isLoading || !me) {
    return <div>로딩 ... </div>;
  }

  return (
    <div className="relative card p-7">
      <div className="flex items-center">
        <Avatar src={me.profile.avatar} uiSize="lg" />
        <div className="pl-8 w-full">
          <div className="text-2xl font-bold">
            {me.profile.nameType ? me.profile.nickname : me.profile.name}
          </div>
          <div className="flex">
            <AvatarCareer
              job={me.profile.job?.title}
              annual={me.profile.annual}
              isLoading={isLoading}
              uiSize="md"
            />
          </div>
        </div>
        <div
          className={
            'shrink-0 flex items-center py-2 px-7 border border-solid border-gray-200 rounded-full cursor-pointer'
          }
          onClick={openModal}
        >
          <HiOutlinePencil className="mr-2" />
          <span>수정하기</span>
        </div>
      </div>
      <div className="text-sm py-5">{me.profile.description}</div>
      <div className="pt-5 border-t border-solid border-gray-200">
        <p className="text-sm font-bold mb-3">관심 주제</p>
        <div className="flex gap-1">
          <Badge isLoading={isLoading} text={'개발'} /> {/* 임시 */}
          <Badge isLoading={isLoading} text={'데이터'} /> {/* 임시 */}
          {me.profile.interestTags.map((tag, idx) => {
            return <Badge isLoading={isLoading} key={idx} text={tag.title} />;
          })}
        </div>
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
