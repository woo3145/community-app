'use client';

import { useTags } from '@/hooks/swr/useTags';
import {
  IoChevronBack,
  IoChevronForwardSharp,
  IoEllipsisHorizontal,
} from 'react-icons/io5';

import { useCategorySlider } from '@/hooks/useCategorySlider';
import { CategoryContainerLoading } from './Loading';
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
    return <CategoryContainerLoading />;
  }
  return (
    <div className={`w-full lg:w-[748px] mt-12`}>
      <div className="flex py-5 rounded-b-none px-7 card">
        <div className="w-[632px] flex items-center shrink">
          <div className="relative flex items-center justify-between w-full">
            <CategorySlider
              handleScrollRef={handleScrollRef}
              categoryId={categoryId}
              onClickCategory={onClickCategory}
              subTags={subTags}
            />

            {leftVisible && (
              <div
                className="absolute left-0 flex items-center justify-center p-0 rounded-full cursor-pointer w-11 h-11 card hover:bg-gray-100"
                onClick={onClickLeft}
              >
                <IoChevronBack />
              </div>
            )}
            {rightVisible && (
              <div
                className="absolute right-0 flex items-center justify-center p-0 rounded-full cursor-pointer w-11 h-11 card hover:bg-gray-100"
                onClick={onClickRight}
              >
                <IoChevronForwardSharp />
              </div>
            )}
          </div>
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 p-0 ml-5 cursor-pointer shrink-0 card"
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
