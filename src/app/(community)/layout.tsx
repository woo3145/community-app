import { CategorySlider } from '../_components/molecules/CategorySlider';
import { MyProfile } from '../_components/molecules/profile/MyProfile';

import styles from './layout.module.scss';

export default function CommunityLayout({
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
          <CategorySlider />
        </div>
        <div className={styles.contents_wrapper}>{children}</div>
      </main>
    </div>
  );
}
