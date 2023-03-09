'use client';

import { ArticleCard } from '../components/article_card';
import { WriteButton } from '../components/write_button';

import styles from './page.module.scss';
import { usePosts } from '@/hooks/usePosts';

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
  const { posts } = usePosts(params.slug);
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
