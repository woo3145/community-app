import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import Skeleton from 'react-loading-skeleton';

export const ProfileInfoSkeleton = () => {
  return (
    <div className="relative card p-7">
      <div className="flex items-center">
        <Avatar isLoading={true} uiSize="lg" />
        <div className="w-full pl-8">
          <Skeleton height={'1.5rem'} width={'50%'} />
          <div className="flex">
            <AvatarCareer isLoading={true} uiSize="lg" />
          </div>
        </div>
      </div>
      <Skeleton />
      <Skeleton />
      <Skeleton width={'70%'} />
    </div>
  );
};
