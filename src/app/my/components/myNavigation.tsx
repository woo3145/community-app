import Link from 'next/link';
import styles from './myNavigation.module.scss';

interface Props {
  tab: 'recents' | 'posts' | 'comments' | 'likes';
}

export const MyNavigation = ({ tab }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <Link
          href="/my/recents"
          className={`${styles.tab} ${
            tab === 'recents' ? styles.selected : ''
          }`}
        >
          최근본
        </Link>
        <Link
          href="/my/posts"
          className={`${styles.tab} ${tab === 'posts' ? styles.selected : ''}`}
        >
          작성글
        </Link>
        <Link
          href="/my/comments"
          className={`${styles.tab} ${
            tab === 'comments' ? styles.selected : ''
          }`}
        >
          작성댓글
        </Link>
        <Link
          href="/my/likes"
          className={`${styles.tab} ${tab === 'likes' ? styles.selected : ''}`}
        >
          좋아요
        </Link>
      </div>
    </div>
  );
};
