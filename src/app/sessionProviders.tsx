'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const SessionProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );
};
