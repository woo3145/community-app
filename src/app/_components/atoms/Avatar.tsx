import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading?: boolean;
  src?: string;
  uiSize?: UISize;
  className?: string;
}

export const Avatar = ({
  src,
  isLoading = false,
  uiSize = 'md',
  className,
}: Props) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-8 h-8',
    lg: 'w-24 h-24',
  };
  const iconSizes = {
    sm: 'w-10 h-10 -left-1',
    md: 'w-10 h-10 -left-1',
    lg: 'w-28 h-28 -left-2',
  };

  const sizeClassName = sizes[uiSize];
  const iconSizeClassName = iconSizes[uiSize];

  const circleClassName = `rounded-full shrink-0 ${sizeClassName} ${className}`;

  if (isLoading) {
    return (
      <div className={circleClassName}>
        <Skeleton circle height="100%" />
      </div>
    );
  }
  return src ? (
    <Image
      className={`${circleClassName} object-cover`}
      src={src}
      alt="Profile Image"
      width={100}
      height={100}
    />
  ) : (
    <div
      className={`${circleClassName} relative overflow-hidden bg-gray-100 dark:bg-gray-600`}
    >
      <svg
        className={`absolute ${iconSizeClassName} text-gray-400`}
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
  );
};
