import Link from 'next/link';
import styles from './category_button.module.scss';

interface Props {
  title: string;
  href: string;
  selected?: boolean;
  onClick: () => void;
}

export const CategoryButton = ({ title, href, selected, onClick }: Props) => {
  return (
    <Link
      href={href}
      className={`${styles.category_button} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {title}
    </Link>
  );
};
