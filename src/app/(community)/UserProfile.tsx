'use client';

import Link from 'next/link';
import { Avatar } from '../_components/atoms/Avatar';
import { AvatarCareer } from '../_components/atoms/AvatarCareer';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useMe } from '@/hooks/swr/useMe';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const UserProfile = () => {
  const { me, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="w-full p-6 card">
        <p className="mb-4 text-sm">MY 커뮤니티</p>
        <Link href="/my" className="w-full flex justify-between items-center">
          <div className="flex items-center justify-center">
            <Avatar isLoading={isLoading} />

            <div className="ml-3 w-full">
              <Skeleton />
              <AvatarCareer isLoading={isLoading} />
            </div>
          </div>
          <IoChevronForwardOutline />
        </Link>
      </div>
    );
  }

  if (!me || !me.profile) {
    return (
      <div className="w-full p-6 card">
        <p className="mb-4 text-sm">MY 커뮤니티</p>
        <Link href="/login" className="flex items-center justify-center">
          <Avatar src="" />
          <span className="w-full ml-3">로그인 해주세요</span>
          <IoChevronForwardOutline className="shrink-0 text-lg" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-6 card">
      <p className="mb-4 text-sm">MY 커뮤니티</p>
      <Link href="/my" className="w-full flex justify-between items-center">
        <div className="flex items-center justify-center">
          <Avatar src={me.profile.avatar} />

          <div className="ml-3">
            <p className="mr-2 font-bold">
              {me.profile.nameType === true
                ? me.profile.nickname
                : me.profile?.name}
            </p>
            <AvatarCareer
              isLoading={false}
              job={me.profile.job?.title}
              annual={me.profile.annual}
            />
          </div>
        </div>
        <IoChevronForwardOutline />
      </Link>
    </div>
  );
};
