import { SessionProviders } from './_providers/sessionProviders';

import { SWRProvider } from './_providers/swrProvider';
import { Metadata } from 'next';
import { Header } from './_components/molecules/Header';

import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

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
      <body className="w-full mx-auto bg-gray-100 xl:max-w-screen-lg max-xl:no-scrollbar">
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
