import { CSSProperties } from 'react';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  job?: string;
  annual?: number;
  style?: CSSProperties;
}
export const AvatarCareer = ({
  job,
  annual,
  style,
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div style={style} className="flex">
        <Skeleton inline width={36} height={16} />
        <Skeleton inline width={36} height={16} style={{ marginLeft: 8 }} />
      </div>
    );
  }
  return (
    <div style={style} className="flex text-xs font-semibold">
      {job && <span className="text-primary">{job}</span>}
      <span style={{ marginLeft: job ? '8px' : 0 }} className="text-gray-400">
        {!annual || annual === 0 ? '신입' : `${annual}년차`}
      </span>
    </div>
  );
};
