import Link from 'next/link';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.nav_left}>
            <Link href="/" className={styles.logo}>
              <b>Woo3145</b> Community
            </Link>
          </div>
          <div className={styles.nav_right}>
            <button className={styles.signup_button}>회원가입/로그인</button>
          </div>
        </nav>
      </div>
    </div>
  );
};
