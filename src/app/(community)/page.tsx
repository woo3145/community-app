'use client';

import { Inter } from '@next/font/google';
import { ArticleCard } from './components/article_card';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Community() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section className={styles.article_list_section}>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </section>
    </div>
  );
}
