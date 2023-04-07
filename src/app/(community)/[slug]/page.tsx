'use client';

import { PostItem } from '@/app/_components/molecules/PostItem';

import styles from './page.module.scss';
import { usePosts } from '@/hooks/usePosts';
import { WriteButton } from '@/app/_components/molecules/WriteButton';
import PostList from '@/app/_components/organisms/PostList';

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.writeButtonSection}>
        <WriteButton />
      </section>
      <section className={styles.postListSection}>
        <PostList category={params.slug} />
      </section>
    </div>
  );
}
