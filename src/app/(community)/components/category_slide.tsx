import { CategoryButton } from '@/app/_common/category_button';
import { useTags } from '@/hooks/useTags';
import { useEffect, useRef, useState } from 'react';
import {
  IoChevronBack,
  IoChevronForwardSharp,
  IoEllipsisHorizontal,
} from 'react-icons/io5';

import styles from './category_slide.module.scss';

export const CategorySlide = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState<number>();
  const { tags, subTags, isLoading, isError } = useTags();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (categoryId == null) {
      const pathname = window.location.pathname.slice(1);
      if (pathname === '') {
        setCategoryId(-1);
      } else if (pathname === 'all') {
        setCategoryId(0);
      } else {
        setCategoryId(parseInt(pathname));
      }
    }
  }, [categoryId]);

  const onClickCategory = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  const onClickLeft = () => {
    if (!scrollRef.current) return;
    const curLeft = scrollRef.current.scrollLeft;
    if (curLeft <= 200) {
      scrollRef.current.scrollTo({ left: 0 });
    } else {
      scrollRef.current.scrollTo({ left: curLeft - 200 });
    }
  };
  const onClickRight = () => {
    if (!scrollRef.current) return;
    const curLeft = scrollRef.current.scrollLeft;
    const maxWidth = scrollRef.current.scrollWidth;
    if (maxWidth < curLeft + 200) {
      scrollRef.current.scrollTo({ left: maxWidth });
    } else {
      scrollRef.current.scrollTo({ left: curLeft + 200 });
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.category_list} ref={scrollRef}>
            <CategoryButton
              title="추천"
              href=""
              onClick={() => onClickCategory(-1)}
              selected={categoryId === -1}
            />
            <CategoryButton
              title="전체"
              href="/all"
              onClick={() => onClickCategory(0)}
              selected={categoryId === 0}
            />
            {subTags?.map((category) => {
              return (
                <CategoryButton
                  key={category.id}
                  title={category.title}
                  href={`/${category.id}`}
                  onClick={() => onClickCategory(category.id)}
                  selected={categoryId === category.id}
                />
              );
            })}
          </div>

          <div className={styles.leftButton} onClick={onClickLeft}>
            <IoChevronBack />
          </div>
          <div className={styles.rightButton} onClick={onClickRight}>
            <IoChevronForwardSharp />
          </div>
        </div>
        <div className={styles.moreButton}>
          <IoEllipsisHorizontal />
        </div>
      </div>
    </div>
  );
};
