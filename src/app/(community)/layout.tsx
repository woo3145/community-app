import styles from './template.module.scss';
import { MyProfile } from '../_common/profile/my_profile';
import { CategorySlide } from './components/category_slide';

export default function CommunityTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.myProfile}>
            <p className={styles.title}>MY 커뮤니티</p>
            <MyProfile arrow />
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.categories}>
          <CategorySlide />
        </div>
        <div className={styles.contents_wrapper}>{children}</div>
      </main>
    </div>
  );
}
