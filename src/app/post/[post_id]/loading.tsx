import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '@/app/_components/molecules/profile/UserProfile';
import { PostContent } from '@/app/_components/molecules/PostContent';

import styles from './page.module.scss';

export default async function Loading() {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            <UserProfile isLoading={true} />
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContent isLoading={true} />

          <div className={styles.tagList}>
            {[1, 2].map((dumy, idx) => {
              return <Badge isLoading={true} key={idx} />;
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
