import { CSSProperties, forwardRef } from 'react';
import styles from './styles.module.scss';

interface Props {
  text: string;
  type?: MessageType;
  size?: UISize;
  position?: 'center' | 'left' | 'right';
  style?: CSSProperties;
  dataCy?: string;
}
const Message = ({
  text,
  type = 'guide',
  size = 'md',
  position = 'left',
  style,
  dataCy,
}: Props) => {
  return (
    <p
      className={`${styles[size]} ${styles[position]} ${styles[type]}`}
      style={style}
      data-cy={dataCy}
    >
      {text}
    </p>
  );
};

export default Message;
