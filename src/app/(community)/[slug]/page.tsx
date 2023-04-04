'use client';

import { PostItem } from '@/app/_components/organisms/PostItem';
import { WriteButton } from '../components/write_button';

import styles from './page.module.scss';
import { usePosts } from '@/hooks/usePosts';

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
  const { data, isLoading, bottomRef, isReachedEnd } = usePosts(params.slug);
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
