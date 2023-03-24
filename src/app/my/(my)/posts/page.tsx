'use client';

import { ArticleCard } from '@/app/(community)/components/article_card';
import { usePosts } from '@/hooks/usePosts';
import { MyNavigation } from '../../components/myNavigation';

import styles from '../page.module.scss';

export default function MyPagePosts() {
  const { data, isLoading } = usePosts(); // 임시
  return (
    <div className={styles.wrapper}>
      <MyNavigation tab="posts" />
      <div>
        {isLoading ? (
          <div>loading..</div>
        ) : (
          <div>
            {data.map((page) =>
              page.posts.map((post) => {
                return <ArticleCard key={post.id} article={post} />;
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
