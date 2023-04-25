'use client';

import { fetchApi } from '@/libs/client/fetchHelper';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const SessionProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: fetchApi,
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );
};
