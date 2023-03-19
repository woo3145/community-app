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
  return <li className={`${styles.badge} ${styles[size]}`}>{text}</li>;
};

export const LinkBadge = ({ text, href, size = 'md' }: LinkBadgeProps) => {
  return (
    <Link href={href} className={`${styles.badge} ${styles[size]}`}>
      {text}
    </Link>
  );
};
