'use client';

import { mockArticles } from '@/mocks/mockArticles';
import { ArticleCard } from './components/article_card';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

export default function Community() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section className={styles.article_list_section}>
        {mockArticles.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </section>
    </div>
  );
}
