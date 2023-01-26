import { Inter } from '@next/font/google';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Post() {
  return (
    <main className={styles.main}>
      <h2 className={inter.className}>Post</h2>
    </main>
  );
}
