import { CSSProperties } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

interface Props {
  text: string;
  onClick?: () => void;
  size?: UISize;
  style?: CSSProperties;
  href?: string;
}

const Badge = ({ text, onClick, size = 'md', style, href }: Props) => {
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
