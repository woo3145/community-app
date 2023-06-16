'use client';

import { IoEllipsisHorizontal } from 'react-icons/io5';

import Skeleton from 'react-loading-skeleton';

const CategorySliderLoading = () => {
  return (
    <div
      className={
        'flex w-full gap-2 overflow-x-scroll scroll-smooth no-scrollbar'
      }
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        return <Skeleton key={i} width={80} height={32} borderRadius={100} />;
      })}
    </div>
  );
};
const MockMoreButton = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 p-0 ml-5 cursor-pointer shrink-0 card">
      <IoEllipsisHorizontal />
    </div>
  );
};

export const CategoryContainerLoading = () => {
  return (
    <div className={`w-full xl:w-[748px] mt-14 xl:mt-12`}>
      <div className="relative flex items-center w-full h-20 pr-12 border-t-0 rounded-none xl:border xl:rounded-t-md px-7 card">
        <CategorySliderLoading />
        <MockMoreButton />
      </div>
    </div>
  );
};
