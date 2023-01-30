import Link from 'next/link';

import styles from './author_box.module.scss';

interface Props {
  author: IAuthor;
  createAt?: string;
}

export const AuthorBox = ({ author, createAt }: Props) => {
  return (
    <Link href={'/'}>
      <div className={styles.author_box}>
        <div className={styles.userAvatar}></div>

        <div className={styles.verticleBox}>
          <div className={styles.userInfo}>
            <p className={styles.user_name}>{author.name}</p>
            <div className={styles.user_career}>
              <span>{author.job}</span>
              <span>{author.carrer}</span>
            </div>
          </div>
          {createAt && <div className={styles.createAt}>{createAt}</div>}
        </div>
      </div>
    </Link>
  );
};
