import Link from 'next/link';
import { formatDate } from '@/libs/client/dateUtils';
import { Avatar } from '@/app/_components/atoms/Avatar';
import { AvatarCareer } from '@/app/_components/atoms/AvatarCareer';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  profile?: Profile;
  createAt?: Date;
  size?: UISize;
}

export const AuthorProfile = ({
  profile,
  createAt,
  size = 'md',
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className="inline-block">
        <div className={`flex items-center justify-center`}>
          <Avatar isLoading={isLoading} />

          <div className="ml-3">
            <div className="flex justify-start items-center">
              <Skeleton width={72} height={16} style={{ marginRight: 8 }} />
              <AvatarCareer isLoading={isLoading} />
            </div>
            <Skeleton style={{ marginTop: 4 }} />
          </div>
        </div>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="inline-block">
        <div className={`flex items-center justify-center`}>
          <Avatar src={''} />

          <div className="ml-3">
            <div className="flex justify-start items-center">
              <p className="font-bold text-sm">탈퇴한 사용자</p>
            </div>

            {createAt && (
              <div className="text-gray-500 text-xs">
                {formatDate(createAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link href={`/profile/${profile?.userId}`} className="inline-block">
      <div className={`flex items-center justify-center`}>
        <Avatar src={profile.avatar} />

        <div className="ml-3">
          <div className="flex justify-start items-center">
            <p className="font-bold mr-2 text-sm">
              {profile.nameType ? profile.nickname : profile.name}
            </p>

            <AvatarCareer
              isLoading={isLoading}
              job={profile.job?.title || ''}
              annual={profile.annual}
            />
          </div>
          {createAt && (
            <div className="text-gray-500 text-xs">{formatDate(createAt)}</div>
          )}
        </div>
      </div>
    </Link>
  );
};
