'use client';

import { usePosts } from '@/hooks/usePosts';
import { ArticleCard } from './components/article_card';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

export default function Community() {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts();

  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section className={styles.article_list_section}>
        {data.map((page) =>
          page.posts.map((article) => {
            return <ArticleCard key={article.id} article={article} />;
          })
        )}
      </section>
      {isLoading ? (
        <div>loading..</div>
      ) : (
        !isReachedEnd && <div ref={bottomRef}></div>
      )}
    </div>
  );
}
