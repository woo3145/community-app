import './globals.scss';
import { Header } from './_common/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
