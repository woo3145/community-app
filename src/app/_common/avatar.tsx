import Image from 'next/image';

import styles from './avatar.module.scss';

interface Props {
  src?: string;
}

export const Avatar = ({ src }: Props) => {
  if (!src) {
    return <div className={styles.defaultAvatar}></div>;
  }
  return (
    <Image
      className={styles.avatar}
      src={src}
      alt="Profile Image"
      width={200}
      height={200}
    ></Image>
  );
};
