import { CSSProperties } from 'react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

interface Props {
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

const Badge = ({ text, onClick, href, isLoading, className }: Props) => {
  const baseClassName = `badge ${onClick && 'cursor pointer'}`;
  const integrationClassName = `${baseClassName} ${className}`;

  if (isLoading) {
    return <Skeleton width={60} height={20} />;
  }

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={integrationClassName}>
        {text}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={integrationClassName}>
      {text}
    </div>
  );
};

export default Badge;
