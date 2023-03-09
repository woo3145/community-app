'use client';

import { CategoryButton } from '../_common/category_button';
import { useEffect, useState } from 'react';
import { mockCategories } from '@/mocks/mockCategories';

import styles from './template.module.scss';
import { MyProfile } from '../_common/profile/my_profile';
import { CategorySlide } from './components/category_slide';

export default function CommunityTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [curCategory, setCurCategory] = useState(-1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname.slice(1);
    if (pathname === '') {
      setCurCategory(0);
    } else if (pathname === 'all') {
      setCurCategory(1);
    } else {
      setCurCategory(parseInt(pathname));
    }

    console.log('Rerender');
  }, []);

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
