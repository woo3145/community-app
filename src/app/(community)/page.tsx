import styles from './page.module.scss';
import { WriteButton } from '../_components/molecules/WriteButton';
import PostList from '../_components/organisms/PostList';

export default function Community() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.writeButtonSection}>
        <WriteButton />
      </section>
      <section className={styles.postListSection}>
        <PostList category="" />
      </section>
    </div>
  );
}
