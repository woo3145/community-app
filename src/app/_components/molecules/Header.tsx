'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
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

  return (
    <>
      <div className="fixed left-0 right-0 z-20 flex items-center justify-center w-full bg-white border-b border-gray-200 border-solid h-14">
        <div className="container max-w-screen-lg px-6 lg:px-2">
          <nav className="flex items-center justify-between w-full">
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
