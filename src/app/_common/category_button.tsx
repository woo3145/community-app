import Link from 'next/link';
import styles from './category_button.module.scss';

interface Props {
  name: string;
  href: string;
  selected?: boolean;
  onClick: () => void;
}

export const CategoryButton = ({ name, href, selected, onClick }: Props) => {
  return (
    <Link
      href={href}
      className={`${styles.category_button} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};
