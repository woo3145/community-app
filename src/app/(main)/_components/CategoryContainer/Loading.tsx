'use client';

import { IoEllipsisHorizontal } from 'react-icons/io5';

import Skeleton from 'react-loading-skeleton';

const CategorySliderLoading = () => {
  return (
    <div className="w-full flex items-center justify-between relative">
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
    <div className="w-10 h-10 shrink-0 card flex items-center justify-center p-0 ml-5 cursor-pointer">
      <IoEllipsisHorizontal />
    </div>
  );
};

export const CategoryContainerLoading = () => {
  return (
    <div className={`w-full lg:w-[748px] mt-12`}>
      <div className="flex py-5 px-7 card rounded-b-none">
        <div className="w-[632px] flex items-center shrink">
          <CategorySliderLoading />
        </div>
        <MockMoreButton />
      </div>
    </div>
  );
};
