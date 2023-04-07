'use client';

import { IoEllipsisHorizontal } from 'react-icons/io5';

import styles from './styles.module.scss';

export const CategorySliderLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexBox}>
        <div className={styles.categoryList}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            return <div key={i} className={styles.mockButton}></div>;
          })}
        </div>
      </div>
      <div className={styles.moreButton}>
        <IoEllipsisHorizontal />
      </div>
    </div>
  );
};
