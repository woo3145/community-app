'use client';
import { MyNavigation } from '../../components/myNavigation';

import styles from '../page.module.scss';

export default function MyPageComments() {
  return (
    <div className={styles.wrapper}>
      <MyNavigation tab="comments" />
      <div>Comments</div>
    </div>
  );
}
