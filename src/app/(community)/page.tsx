'use client';

import { Inter } from '@next/font/google';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Community() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section>글목록</section>
    </div>
  );
}
