import { Metadata } from 'next';

import { ToastContainer } from 'react-toastify';

import { SessionProviders } from './_providers/sessionProviders';
import { SWRProvider } from './_providers/swrProvider';
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
      <body className="mx-auto bg-gray-100">
        <div className="w-full mx-auto xl:max-w-screen-lg">
          <SessionProviders>
            <SWRProvider>
              <Header />
              {children}
              <ToastContainer />
            </SWRProvider>
          </SessionProviders>
        </div>
      </body>
    </html>
  );
}
