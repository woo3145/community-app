'use client';

import { Inter } from '@next/font/google';

import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Community() {
  return (
    <div className={styles.wrapper}>
      <section>글쓰기</section>
      <section>글목록</section>
    </div>
  );
}
