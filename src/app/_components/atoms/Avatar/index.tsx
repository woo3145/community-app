import Image from 'next/image';

import styles from './styles.module.scss';

interface Props {
  src?: string;
  size?: UISize;
}

export const Avatar = ({ src, size = 'md' }: Props) => {
  if (!src) {
    return <div className={styles.defaultAvatar}></div>;
  }
  return (
    <Image
      className={`${styles.avatar} ${styles[size]}`}
      src={src}
      alt="Profile Image"
      width={100}
      height={100}
    ></Image>
  );
};
