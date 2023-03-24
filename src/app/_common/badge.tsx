import Link from 'next/link';

import styles from './badge.module.scss';

interface BadgeProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
}
interface LinkBadgeProps extends BadgeProps {
  href: string;
}
export const Badge = ({ text, size = 'md' }: BadgeProps) => {
  return <div className={`${styles.badge} ${styles[size]}`}>{text}</div>;
};

export const LinkBadge = ({ text, href, size = 'md' }: LinkBadgeProps) => {
  return (
    <Link href={href} className={`${styles.badge} ${styles[size]}`}>
      {text}
    </Link>
  );
};
