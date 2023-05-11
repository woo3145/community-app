import { Header } from './_common/header';
import { SessionProviders } from './_providers/sessionProviders';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { SWRProvider } from './_providers/swrProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Woo3145 - Community',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SessionProviders>
          <SWRProvider>
            <Header />
            {children}
          </SWRProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
