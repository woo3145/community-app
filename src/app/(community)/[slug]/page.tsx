import styles from './page.module.scss';
import { WriteButton } from '@/app/_components/molecules/WriteButton';
import PostList from '@/app/_components/organisms/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Woo3145 - Community',
};

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
