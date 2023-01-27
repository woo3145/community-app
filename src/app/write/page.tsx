import { Inter } from '@next/font/google';
import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Write() {
  return (
    <main className={styles.main}>
      <h2 className={inter.className}>Write</h2>
    </main>
  );
}
