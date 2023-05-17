import Image from 'next/image';
import { CSSProperties } from 'react';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading?: false;
  src?: string;
  style?: CSSProperties;
  uiSize?: UISize;
}

export const Avatar = ({
  src,
  style,
  isLoading = false,
  uiSize = 'md',
}: Props | IsLoadingProps) => {
  const sizes: { [key: string]: string } = {
    sm: 'w-8 h-8',
    md: 'w-8 h-8',
    lg: 'w-24 h-24',
  };
  const iconSizes: { [key: string]: string } = {
    sm: 'w-10 h-10 -left-1',
    md: 'w-10 h-10 -left-1',
    lg: 'w-28 h-28 -left-2',
  };
  if (isLoading) {
    return (
      <div className={`rounded-full shrink-0 ${sizes[uiSize]}`}>
        <Skeleton circle height="100%" />
      </div>
    );
  }
  return (
    <div className={`relative rounded-full shrink-0 ${sizes[uiSize]}`}>
      {src ? (
        <Image
          style={style}
          className={`rounded-full object-cover ${sizes[uiSize]}`}
          src={src}
          alt="Profile Image"
          width={100}
          height={100}
        />
      ) : (
        <div
          className={`rounded-full shrink-0 ${sizes[uiSize]} relative overflow-hidden bg-gray-100 dark:bg-gray-600`}
        >
          <svg
            className={`absolute ${iconSizes[uiSize]} text-gray-400`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};
