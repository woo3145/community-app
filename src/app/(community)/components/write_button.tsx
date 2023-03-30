import { Avatar } from '@/app/_components/atoms/Avatar';
import Link from 'next/link';
import { HiOutlinePencil } from 'react-icons/hi';
import styles from './write_button.module.scss';

export const WriteButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Avatar src={''} />
      </div>
      <Link href="/write" className={styles.writeButton}>
        <span>커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!</span>
        <HiOutlinePencil size={24} />
      </Link>
    </div>
  );
};
