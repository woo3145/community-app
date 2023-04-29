import { CSSProperties } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  text: string;
  onClick?: () => void;
  size?: UISize;
  style?: CSSProperties;
  href?: string;
}

const Badge = ({
  text,
  onClick,
  size = 'md',
  style,
  href,
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return <Skeleton width={60} height={20} />;
  }

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        style={style}
        className={`${styles.badge} ${styles[size]}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      style={style}
      className={`${styles.badge} ${styles[size]} ${
        onClick !== undefined ? styles.cursor : ''
      }`}
    >
      {text}
    </div>
  );
};

export default Badge;
