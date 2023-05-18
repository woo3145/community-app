'use client';

import { ProfileInfoSkeleton } from '@/app/(profile)/_components/ProfileInfoSkeleton';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import Badge from '@/app/_components/atoms/Badge';
import { useProfile } from '@/hooks/swr/useProfile';

export const UserProfileInfo = ({ userId }: { userId: string }) => {
  const { profile, isLoading } = useProfile(userId);

  if (isLoading || !profile) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <div className="relative card p-7">
      <div className="flex items-center">
        <Avatar src={profile.avatar} uiSize="lg" />
        <div className="w-full pl-8">
          <div className="text-2xl font-bold">
            {profile.nameType ? profile.nickname : profile.name}
          </div>
          <div className="flex">
            <AvatarCareer
              job={profile.job?.title}
              annual={profile.annual}
              isLoading={isLoading}
              uiSize="md"
            />
          </div>
        </div>
      </div>
      <div className="py-5 text-sm">{profile.description}</div>
      <div className="pt-5 border-t border-gray-200 border-solid">
        <p className="mb-3 text-sm font-bold">관심 주제</p>
        <div className="flex gap-1">
          <Badge isLoading={isLoading} text={'개발'} />
          <Badge isLoading={isLoading} text={'데이터'} />
          {profile.interestTags.map((tag, idx) => {
            return <Badge isLoading={isLoading} key={idx} text={tag.title} />;
          })}
        </div>
      </div>
    </div>
  );
};
