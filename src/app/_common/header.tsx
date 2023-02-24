'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
const SignoutButton = () => {
  const onClick = () => {
    signOut();
  };
  return (
    <div onClick={onClick} className={styles.signup_button}>
      로그아웃
    </div>
  );
};

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // refreshToken이 만료된 경우
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/login');
    }
  }, [session, router]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <div>
              <Logo />
            </div>
            <div>{session?.user ? <SignoutButton /> : <SignupButton />}</div>
          </nav>
        </div>
      </div>
      <div className={styles.paddingBox}></div>
    </>
  );
};
