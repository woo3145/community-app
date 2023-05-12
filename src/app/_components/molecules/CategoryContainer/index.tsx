'use client';

import Button from '@/app/_components/atoms/Button';
import { useTags } from '@/hooks/swr/useTags';
import {
  IoChevronBack,
  IoChevronForwardSharp,
  IoEllipsisHorizontal,
} from 'react-icons/io5';

import { useCategorySlider } from '@/hooks/useCategorySlider';
import { CategorySliderLoading } from './Loading';
import styles from './styles.module.scss';
import { CategoryButton } from './CategoryButton';
import { MoreCategories } from './MoreCategories';
import { CategorySlider } from './CategorySlider';

export const CategoryContainer = () => {
  const {
    categoryId,
    handleScrollRef,
    leftVisible,
    rightVisible,
    moreVisible,
    onClickLeft,
    onClickRight,
    onClickCategory,
    onClickMoreButton,
  } = useCategorySlider();

  const { subTags, isLoading } = useTags();

  if (isLoading) {
    return <CategorySliderLoading />;
  }
  return (
    <div className={`w-full lg:w-[748px]`}>
      <div className={styles.container}>
        <div className={styles.flexBox}>
          <CategorySlider
            handleScrollRef={handleScrollRef}
            categoryId={categoryId}
            onClickCategory={onClickCategory}
            subTags={subTags}
          />

          {leftVisible && (
            <div className={styles.leftButton} onClick={onClickLeft}>
              <IoChevronBack />
            </div>
          )}
          {rightVisible && (
            <div className={styles.rightButton} onClick={onClickRight}>
              <IoChevronForwardSharp />
            </div>
          )}
        </div>
        <div
          className={styles.moreButton}
          onClick={onClickMoreButton}
          data-cy="more-button"
        >
          <IoEllipsisHorizontal />
        </div>
      </div>
      {moreVisible && (
        <MoreCategories
          categoryId={categoryId}
          onClickCategory={onClickCategory}
          subTags={subTags}
        />
      )}
    </div>
  );
};
