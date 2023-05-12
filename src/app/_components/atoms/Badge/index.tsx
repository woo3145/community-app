import { CSSProperties } from 'react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
  href?: string;
}

const Badge = ({
  text,
  onClick,
  style,
  href,
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return <Skeleton width={60} height={20} />;
  }

  if (href) {
    return (
      <Link href={href} onClick={onClick} style={style} className="badge">
        {text}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      style={style}
      className={`badge ${onClick && 'cursor-pointer'}`}
    >
      {text}
    </div>
  );
};

export default Badge;
