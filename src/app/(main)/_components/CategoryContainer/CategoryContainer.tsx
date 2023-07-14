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
import { MyAvatar } from './MyAvatar';
import { useCallback, useState } from 'react';

export const CategoryContainer = () => {
  const {
    categoryId,
    handleScrollRef,
    leftVisible,
    rightVisible,
    onClickLeft,
    onClickRight,
    onClickCategory,
  } = useCategorySlider();

  const { subTags, isLoading } = useTags();

  const [moreVisible, setMoreVisible] = useState(false);

  const onClickMoreButton = useCallback(() => {
    setMoreVisible(!moreVisible);
  }, [moreVisible]);

  if (isLoading) {
    return <CategoryContainerLoading />;
  }
  return (
    <div className={`relative w-full xl:w-[748px] mt-14 xl:mt-12`}>
      <div className="relative flex items-center h-20 px-2 pr-[4.5rem] border-t-0 rounded-none xl:border xl:rounded-t-md xl:pr-16 card">
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
        {/* More Button (Desktop)*/}
        <div
          className="absolute items-center justify-center hidden w-10 h-10 p-0 ml-5 cursor-pointer xl:flex right-4 card"
          onClick={onClickMoreButton}
          data-cy="more-button-desktop"
        >
          <IoEllipsisHorizontal />
        </div>
        {/* User Profile (Mobile)*/}
        <div
          className="absolute flex items-center justify-center w-10 h-10 p-0 pl-5 ml-5 border-l cursor-pointer right-4 xl:hidden"
          data-cy="more-button-mobile"
        >
          <MyAvatar />
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
