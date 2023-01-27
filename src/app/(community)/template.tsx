'use client';

import { CategoryButton } from '../_common/category_button';
import { IoChevronForwardOutline } from 'react-icons/io5';

import styles from './template.module.scss';
import { useEffect, useState } from 'react';

const categories = [
  {
    id: 1001,
    name: '고민',
  },
  {
    id: 1002,
    name: '개발',
  },
];

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
  }, []);

  const onClickCategoryButton = (categoryId: number) => {
    setCurCategory(categoryId);
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.myProfile}>
            <p>MY 커뮤니티</p>
            <button>
              <div className={styles.userAvatar}></div>
              <span>로그인 해주세요</span>
              <IoChevronForwardOutline size={20} />
            </button>
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.categories}>
          <div className={styles.categories_container}>
            <CategoryButton
              name="추천"
              href=""
              onClick={() => onClickCategoryButton(0)}
              selected={curCategory === 0}
            />
            <CategoryButton
              name="전체"
              href="/all"
              onClick={() => onClickCategoryButton(1)}
              selected={curCategory === 1}
            />
            {categories.map((category) => {
              return (
                <CategoryButton
                  key={category.id}
                  name={category.name}
                  href={`/${category.id}`}
                  onClick={() => onClickCategoryButton(category.id)}
                  selected={curCategory === category.id}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.contents_wrapper}>{children}</div>
      </main>
    </div>
  );
}
