import { CSSProperties } from 'react';
import styles from './styles.module.scss';
import Skeleton from 'react-loading-skeleton';

interface Props {
  id?: string;
  text: string;
  type?: ButtonType;
  onClick?: () => void;
  isValid?: boolean;
  wide?: boolean;
  outlined?: boolean;
  selected?: boolean;
  size?: UISize;
  icon?: React.ReactNode;
  style?: CSSProperties;
}

const Button = ({
  id,
  text,
  onClick,
  type = 'button',
  isValid = true,
  wide = false,
  outlined = false,
  selected = false,
  size = 'md',
  icon,
  style,
}: Props) => {
  return (
    <button
      id={id ? id : ''}
      type={type}
      onClick={onClick}
      disabled={!isValid}
      style={style}
      className={`${styles.button} ${outlined ? styles.outlined : ''} ${
        selected ? styles.selected : ''
      } ${isValid ? styles.valid : ''}
      ${wide ? styles.wide : ''} ${styles[size]}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
