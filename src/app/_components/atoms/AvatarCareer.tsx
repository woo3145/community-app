import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading?: boolean;
  job?: string;
  annual?: number;
  uiSize?: UISize;
  className?: string;
}
export const AvatarCareer = ({
  job,
  annual,
  className,
  isLoading,
  uiSize = 'md',
}: Props) => {
  const avatarCareerSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-md',
  };
  const skeletonSizes = {
    sm: '0.8rem',
    md: '1rem',
    lg: '1.5rem',
  };

  const integrationClassName = `flex font-semibold ${avatarCareerSizes[uiSize]} ${className}`;

  if (isLoading) {
    return (
      <div className={integrationClassName}>
        <Skeleton inline width={40} height={skeletonSizes[uiSize]} />
        <Skeleton
          inline
          width={40}
          height={skeletonSizes[uiSize]}
          style={{ marginLeft: 8 }}
        />
      </div>
    );
  }
  return (
    <div className={integrationClassName}>
      {job && <span className="mr-2 text-primary">{job}</span>}
      <span className="text-gray-400">
        {!annual || annual === 0 ? '신입' : `${annual}년차`}
      </span>
    </div>
  );
};
