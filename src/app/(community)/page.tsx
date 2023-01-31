'use client';

import { ArticleCard } from './components/article_card';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

const mockArticles: IArticle[] = [
  {
    id: 1,
    title: '제목',
    contents: '내용',
    tags: [
      {
        id: 1,
        name: '개발',
      },
    ],
    like_count: 0,
    comment_count: 0,
    author: {
      id: 1,
      name: 'woo3145',
    },
    createAt: '8시간 전',
  },
  {
    id: 2,
    title: '제목22',
    contents: '내용22',
    tags: [
      {
        id: 1,
        name: '개발',
      },
    ],
    like_count: 4,
    comment_count: 4,
    author: {
      id: 2,
      name: 'woo31456',
    },
    createAt: '2023.01.27',
  },
];

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
