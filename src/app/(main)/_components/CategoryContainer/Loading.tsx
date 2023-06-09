'use client';

import { IoEllipsisHorizontal } from 'react-icons/io5';

import Skeleton from 'react-loading-skeleton';

const CategorySliderLoading = () => {
  return (
    <div className="relative flex items-center justify-between w-full">
      <div
        className={'flex gap-2 overflow-x-scroll scroll-smooth no-scrollbar'}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return <Skeleton key={i} className="w-20 h-8 rounded-full" />;
        })}
      </div>
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
    <div className={`w-full lg:w-[748px] mt-12`}>
      <div className="flex py-5 rounded-b-none px-7 card">
        <div className="w-[632px] flex items-center shrink">
          <CategorySliderLoading />
        </div>
        <MockMoreButton />
      </div>
    </div>
  );
};
