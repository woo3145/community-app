'use client';

import { usePosts } from '@/hooks/usePosts';
import { WriteButton } from './components/write_button';

import styles from './page.module.scss';
import { PostItem } from '../_components/organisms/PostItem';

export default function Community() {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts();

  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section className={styles.article_list_section}>
        {data.map((page) =>
          page.posts.map((post) => {
            return <PostItem key={post.id} post={post} />;
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
