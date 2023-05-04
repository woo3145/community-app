'use client';

import { fetchApi } from '@/libs/client/fetchHelper';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetchApi,
      }}
    >
      {children}
    </SWRConfig>
  );
};
