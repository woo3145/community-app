'use client';

import useSWR, { Fetcher } from 'swr';
import { ArticleCard } from './components/article_card';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';

interface GetPostsResponse {
  posts: IArticle[];
}

const fetcher: Fetcher<GetPostsResponse> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function Community() {
  const { data } = useSWR<GetPostsResponse>('/api/posts', fetcher);
  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section className={styles.article_list_section}>
        {data?.posts.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </section>
    </div>
  );
}
