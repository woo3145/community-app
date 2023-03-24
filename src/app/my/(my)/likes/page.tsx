'use client';
import { MyNavigation } from '../../components/myNavigation';

import styles from '../page.module.scss';

export default function MyPageLikes() {
  return (
    <div className={styles.wrapper}>
      <MyNavigation tab="likes" />
      <div>Likes</div>
    </div>
  );
}
