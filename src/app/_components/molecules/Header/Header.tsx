'use client';

import { useSession } from 'next-auth/react';

import SignoutButton from './SignoutButton';
import SignupButton from './SignupButton';
import Logo from './Logo';

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
    </>
  );
};
