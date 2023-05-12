import Image from 'next/image';
import { CSSProperties } from 'react';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading?: false;
  src?: string;
  style?: CSSProperties;
}

export const Avatar = ({
  src,
  style,
  isLoading = false,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className={`rounded-full shrink-0 w-8 h-8`}>
        <Skeleton circle height="100%" />
      </div>
    );
  }
  return (
    <div className={`relative rounded-full shrink-0 w-8 h-8`}>
      {src ? (
        <Image
          style={style}
          className={`rounded-full object-cover`}
          src={src}
          alt="Profile Image"
          width={100}
          height={100}
        />
      ) : (
        <div
          className={`rounded-full shrink-0 w-8 h-8 relative overflow-hidden bg-gray-100 dark:bg-gray-600`}
        >
          <svg
            className={`absolute w-10 h-10 text-gray-400 -left-1`}
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
