'use client';
import { MyNavigation } from '../../components/myNavigation';

import styles from '../page.module.scss';

export default function MyPageRecents() {
  return (
    <div className={styles.wrapper}>
      <MyNavigation tab="recents" />
      <div>recents</div>
    </div>
  );
}
