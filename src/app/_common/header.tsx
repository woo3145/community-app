import Link from 'next/link';
import styles from './header.module.scss';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <b>Woo3145</b> Community
    </Link>
  );
};
const SignupButton = () => {
  return (
    <Link href={'/login'} className={styles.signup_button}>
      회원가입/로그인
    </Link>
  );
};

export const Header = () => {
  const isLogin = false;
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <div>
              <Logo />
            </div>
            <div>{isLogin ? null : <SignupButton />}</div>
          </nav>
        </div>
      </div>
      <div className={styles.paddingBox}></div>
    </>
  );
};
