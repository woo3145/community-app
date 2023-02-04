import { mockArticles } from '@/mocks/mockArticles';
import { Inter } from '@next/font/google';
import { ArticleCard } from '../components/article_card';
import { WriteButton } from '../components/write_button';

import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
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
