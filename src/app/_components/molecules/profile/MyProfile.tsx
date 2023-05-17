import { Avatar } from '@/app/_components/atoms/Avatar';
import Skeleton from 'react-loading-skeleton';
import { useMe } from '@/hooks/swr/useMe';

interface Props {
  size?: UISize;
}

export const MyProfile = ({ size = 'md' }: Props) => {
  const { me, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="inline-block">
        <div className={`flex items-center justify-center`}>
          <Avatar isLoading={isLoading} />

          <div className="ml-3">
            <div className="flex justify-start items-center">
              <Skeleton width={72} height={16} style={{ marginRight: 8 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!me?.profile) {
    return null;
  }

  return (
    <div className="inline-block">
      <div className={`flex items-center justify-center`}>
        <Avatar src={me.profile.avatar} />

        <div className="ml-3">
          <div className="flex justify-start items-center">
            <p className="font-bold mr-2 text-sm">
              {me.profile.nameType ? me.profile.nickname : me.profile.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
