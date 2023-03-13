'use client';

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

  const [leftVisible, setLeftVisible] = useState(false); // 슬라이드 왼쪽 버튼
  const [rightVisible, setRightVisible] = useState(true); // 슬라이드 오른쪽 버튼
  const [moreVisible, setMoreVisible] = useState(false); // 카테고리 펼치기 버튼

  // 첫 로딩시 현재 페이지의 param으로 categoryId 설정
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (categoryId === undefined) {
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

  // categoryId가 바뀌면 해당 카테고리의 아이템의 위치로 스크롤링
  useEffect(() => {
    if (categoryId === undefined) return;
    if (!scrollRef.current) return;

    const target = scrollRef.current.querySelector(
      `#categoryButton_${categoryId}`
    ) as HTMLElement;

    // target의 위치에서 박스의 절반크기만큼 이동하여 중간으로 위치하도록함
    const position = target.offsetLeft - scrollRef.current.offsetWidth / 2;

    scrollRef.current.scrollTo({
      left: position,
    });
    // 왼쪽 끝 도달 시 왼쪽버튼 제거
    if (position <= 0) {
      setLeftVisible(false);
    } else {
      setLeftVisible(true);
    }

    // 오른쪽 끝 도달 (최대길이 - 박스길이) 시 오른쪽버튼 제거
    if (
      scrollRef.current.scrollWidth - scrollRef.current.offsetWidth <=
      position
    ) {
      setRightVisible(false);
    } else {
      setRightVisible(true);
    }
  }, [categoryId]);

  // 링크 이동
  const onClickCategory = (categoryId: number) => {
    setCategoryId(categoryId);
    setMoreVisible(false);
  };

  // 슬라이드 왼쪽이동
  const onClickLeft = () => {
    if (!scrollRef.current) return;

    const pos = scrollRef.current.scrollLeft - 200; // 이동 할 위치
    if (pos <= 0) {
      scrollRef.current.scrollTo({ left: 0 });
      setLeftVisible(false);
    } else {
      scrollRef.current.scrollTo({ left: pos });
      setRightVisible(true);
    }
  };
  // 슬라이드 오른쪽 이동
  const onClickRight = () => {
    if (!scrollRef.current) return;

    const maxWidth = scrollRef.current.scrollWidth; // 스크롤 총 길이
    const boxWidth = scrollRef.current.offsetWidth; // 박스 길이

    const pos = scrollRef.current.scrollLeft + 200; // 이동 할 위치

    if (maxWidth - boxWidth <= pos) {
      scrollRef.current.scrollTo({ left: maxWidth });
      setRightVisible(false);
    } else {
      scrollRef.current.scrollTo({ left: pos });
      setLeftVisible(true);
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.category_list} ref={scrollRef}>
            <CategoryButton
              id={`categoryButton_-1`}
              key={-1}
              title="추천"
              href=""
              onClick={() => onClickCategory(-1)}
              selected={categoryId === -1}
            />
            <CategoryButton
              id={`categoryButton_0`}
              key={0}
              title="전체"
              href="/all"
              onClick={() => onClickCategory(0)}
              selected={categoryId === 0}
            />
            {subTags?.map((category) => {
              return (
                <CategoryButton
                  id={`categoryButton_${category.id}`}
                  key={category.id}
                  title={category.title}
                  href={`/${category.id}`}
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
        <div
          className={styles.moreButton}
          onClick={() => setMoreVisible(!moreVisible)}
        >
          <IoEllipsisHorizontal />
        </div>
      </div>
      {moreVisible && (
        <div className={styles.moreContainer}>
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
      )}
    </div>
  );
};
