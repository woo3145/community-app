'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const SessionProviders = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
