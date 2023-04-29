import Image from 'next/image';
import { CSSProperties } from 'react';

import styles from './styles.module.scss';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  src?: string;
  size?: UISize;
  style?: CSSProperties;
}

export const Avatar = ({
  src,
  size = 'md',
  style,
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className={`${styles.avatarContainer} ${styles[size]}`}>
        <Skeleton circle height="100%" />
      </div>
    );
  }
  return (
    <div className={`${styles.avatarContainer} ${styles[size]}`}>
      {src ? (
        <Image
          style={style}
          className={`${styles.avatar} ${styles[size]}`}
          src={src}
          alt="Profile Image"
          width={100}
          height={100}
        />
      ) : (
        <div className={styles.defaultAvatar} style={style}></div>
      )}
    </div>
  );
};
