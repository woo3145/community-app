import Link from 'next/link';
import styles from './category_button.module.scss';

interface Props {
  id?: string;
  title: string;
  href: string;
  selected?: boolean;
  onClick: () => void;
}

export const CategoryButton = ({
  id,
  title,
  href,
  selected,
  onClick,
}: Props) => {
  return (
    <Link
      id={id}
      href={href}
      className={`${styles.category_button} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      {title}
    </Link>
  );
};
