import { IconType } from 'react-icons';
import styles from './styles.module.scss';

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
}: Props) => {
  return (
    <button
      id={id ? id : ''}
      type={type}
      onClick={onClick}
      disabled={!isValid}
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
