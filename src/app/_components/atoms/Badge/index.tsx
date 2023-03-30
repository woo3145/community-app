import { CSSProperties } from 'react';
import styles from './styles.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
  size?: UISize;
  style?: CSSProperties;
}

const Badge = ({ text, onClick, size = 'md', style }: Props) => {
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
