import { Header } from './_common/header';
import { SessionProviders } from './sessionProviders';

import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

export const metadata = {
  title: 'Woo3145 - Community',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <SessionProviders>
          <Header />
          {children}
        </SessionProviders>
      </body>
    </html>
  );
}
