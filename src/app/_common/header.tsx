'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const Logo = () => {
  return (
    <Link href="/" className="text-lg text-primary">
      <b className="text-primary">Woo3145</b> Community
    </Link>
  );
};
const SignupButton = () => {
  return (
    <Link
      href={'/login'}
      className="text-sm font-semibold"
      data-cy={'header-login-link'}
    >
      회원가입/로그인
    </Link>
  );
};
const SignoutButton = () => {
  const onClick = () => {
    signOut();
  };
  return (
    <div
      onClick={onClick}
      className="text-sm font-semibold cursor-pointer"
      data-cy={'header-signout-button'}
    >
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
      <div className="w-full fixed left-0 right-0 border-b border-solid bg-white h-14 z-20 border-gray-200 flex items-center justify-center">
        <div className="w-full max-w-screen-lg px-6 lg:px-2">
          <nav className="w-full flex justify-between items-center">
            <Logo />
            <div>{session?.user ? <SignoutButton /> : <SignupButton />}</div>
          </nav>
        </div>
      </div>
      <div className="h-14"></div>

      <ToastContainer />
    </>
  );
};
