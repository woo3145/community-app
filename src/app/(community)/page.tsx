'use client';

import { usePosts } from '@/hooks/usePosts';
import { ArticleCard } from './components/article_card';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

export default function Community() {
  const { posts } = usePosts();
  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section className={styles.article_list_section}>
        {posts.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </section>
    </div>
  );
}
