'use client';

import Button from '@/app/_components/atoms/Button';
import { useTags } from '@/hooks/swr/useTags';
import {
  IoChevronBack,
  IoChevronForwardSharp,
  IoEllipsisHorizontal,
} from 'react-icons/io5';

import styles from './styles.module.scss';
import { useCategorySlider } from '@/hooks/useCategorySlider';
import { CategorySliderLoading } from './Loading';

export const CategorySlider = () => {
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
          <div
            className={styles.categoryList}
            ref={handleScrollRef}
            data-cy="category-list"
          >
            <Button
              id={`categoryButton_-1`}
              outlined
              key={-1}
              text="추천"
              size="sm"
              onClick={() => onClickCategory(-1)}
              selected={categoryId === -1}
              dataCy={`category_${-1}`}
            />
            <Button
              id={`categoryButton_0`}
              outlined
              key={0}
              text="전체"
              size="sm"
              onClick={() => onClickCategory(0)}
              selected={categoryId === 0}
              dataCy={`category_${0}`}
            />
            {subTags?.map((category) => {
              return (
                <Button
                  id={`categoryButton_${category.id}`}
                  outlined
                  key={category.id}
                  text={category.title}
                  size="sm"
                  onClick={() => onClickCategory(category.id)}
                  selected={categoryId === category.id}
                  dataCy={`category_${category.id}`}
                />
              );
            })}
          </div>

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
        <div className={styles.moreContainer} data-cy="category-list-more">
          <Button
            text="추천"
            outlined
            size="sm"
            onClick={() => onClickCategory(-1)}
            selected={categoryId === -1}
            dataCy={`category_${-1}`}
          />
          <Button
            text="전체"
            outlined
            size="sm"
            onClick={() => onClickCategory(0)}
            selected={categoryId === 0}
            dataCy={`category_${0}`}
          />
          {subTags?.map((category) => {
            return (
              <Button
                key={category.id}
                text={category.title}
                outlined
                size="sm"
                onClick={() => onClickCategory(category.id)}
                selected={categoryId === category.id}
                dataCy={`more-category_${category.id}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
