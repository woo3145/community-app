import { CSSProperties, forwardRef } from 'react';
import styles from './styles.module.scss';

interface Props {
  text: string;
  type?: MessageType;
  size?: UISize;
  position?: 'center' | 'left' | 'right';
  style?: CSSProperties;
}
const Message = ({
  text,
  type = 'guide',
  size = 'md',
  position = 'left',
  style,
}: Props) => {
  return (
    <p
      className={`${styles[size]} ${styles[position]} ${styles[type]}`}
      style={style}
    >
      {text}
    </p>
  );
};

export default Message;
