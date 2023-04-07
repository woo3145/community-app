'use client';

import Button from '@/app/_components/atoms/Button';
import { useTags } from '@/hooks/useTags';
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
    <div>
      <div className={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.categoryList} ref={handleScrollRef}>
            <Button
              id={`categoryButton_-1`}
              outlined
              key={-1}
              text="추천"
              size="sm"
              onClick={() => onClickCategory(-1)}
              selected={categoryId === -1}
            />
            <Button
              id={`categoryButton_0`}
              outlined
              key={0}
              text="전체"
              size="sm"
              onClick={() => onClickCategory(0)}
              selected={categoryId === 0}
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
        <div className={styles.moreButton} onClick={onClickMoreButton}>
          <IoEllipsisHorizontal />
        </div>
      </div>
      {moreVisible && (
        <div className={styles.moreContainer}>
          <Button
            text="추천"
            outlined
            size="sm"
            onClick={() => onClickCategory(-1)}
            selected={categoryId === -1}
          />
          <Button
            text="전체"
            outlined
            size="sm"
            onClick={() => onClickCategory(0)}
            selected={categoryId === 0}
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
