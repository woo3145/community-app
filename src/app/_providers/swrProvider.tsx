'use client';

import { fetchApi } from '@/libs/client/fetchHelper';
import { isServerError } from '@/libs/typeGuards';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetchApi,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on 404 / 401.
          if (isServerError(error)) {
            if (error.statusCode === 404 || error.statusCode === 401) return;
          } else {
            if (error?.status === 404 || error?.status === 401) return;
          }

          // Only retry up to 10 times.
          if (retryCount >= 5) return;

          // Retry after 3 seconds.
          setTimeout(() => revalidate({ retryCount }), 3000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
