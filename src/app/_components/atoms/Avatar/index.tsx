import Image from 'next/image';
import { CSSProperties } from 'react';

import styles from './styles.module.scss';

interface Props {
  src?: string;
  size?: UISize;
  style?: CSSProperties;
}

export const Avatar = ({ src, size = 'md', style }: Props) => {
  if (!src) {
    return (
      <div
        className={`${styles.defaultAvatar} ${styles[size]}`}
        style={style}
      ></div>
    );
  }
  return (
    <Image
      style={style}
      className={`${styles.avatar} ${styles[size]}`}
      src={src}
      alt="Profile Image"
      width={100}
      height={100}
    ></Image>
  );
};
