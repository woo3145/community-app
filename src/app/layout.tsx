import { Header } from './_common/header';
import { SessionProviders } from './_providers/sessionProviders';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { SWRProvider } from './_providers/swrProvider';
import { Metadata } from 'next';

import '@/styles/global.css';

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
      <body className="bg-gray-100 w-full max-w-screen-lg mx-auto">
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
