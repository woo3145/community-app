'use client';

import Badge from '@/app/_components/atoms/Badge';
import { HiOutlinePencil } from 'react-icons/hi';
import { MyProfileModifyModal } from '@/app/_components/modals/MyProfileModifyModal';
import { useMe } from '@/hooks/swr/useMe';
import { useModalVisible } from '@/hooks/useModalVisible';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import { ProfileInfoSkeleton } from '../../_components/ProfileInfoSkeleton';

export const MyProfileInfo = () => {
  const { me, isLoading } = useMe();
  const { modalIsOpen, openModal, closeModal } = useModalVisible();

  if (isLoading || !me) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <div className="relative card p-7">
      <div className="flex items-center">
        <Avatar src={me.profile.avatar} uiSize="lg" dataCy="userinfo-avatar" />
        <div className="w-full pl-8">
          <div className="text-2xl font-bold" data-cy="userName">
            {me.profile.nameType ? me.profile.nickname : me.profile.name}
          </div>
          <div className="flex">
            <AvatarCareer
              job={me.profile.job?.title}
              annual={me.profile.annual}
              isLoading={isLoading}
              uiSize="lg"
            />
          </div>
        </div>
        <div
          className={
            'shrink-0 flex items-center py-2 px-7 border border-solid border-gray-200 rounded-full cursor-pointer'
          }
          onClick={openModal}
          data-cy={'editProfile-button'}
        >
          <HiOutlinePencil className="mr-2" />
          <span>수정하기</span>
        </div>
      </div>

      <div className="py-5 text-sm whitespace-pre-line" data-cy="description">
        {me.profile.description}
      </div>

      <div className="pt-5 border-t border-gray-200 border-solid">
        <p className="mb-3 text-sm font-bold">관심 주제</p>
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
