import { Dispatch, SetStateAction } from 'react';

import styles from './styles.module.scss';
import { MyCommunityTabType } from '..';

interface Props {
  tab: MyCommunityTabType;
  setTab: Dispatch<SetStateAction<MyCommunityTabType>>;
}

export const MyCommunityTab = ({ tab, setTab }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            tab === 'recents' ? styles.selected : ''
          }`}
          onClick={() => setTab('recents')}
        >
          최근본
        </div>
        <div
          className={`${styles.tab} ${tab === 'posts' ? styles.selected : ''}`}
          onClick={() => setTab('posts')}
        >
          작성글
        </div>
        <div
          className={`${styles.tab} ${
            tab === 'comments' ? styles.selected : ''
          }`}
          onClick={() => setTab('comments')}
        >
          작성댓글
        </div>
        <div
          className={`${styles.tab} ${tab === 'likes' ? styles.selected : ''}`}
          onClick={() => setTab('likes')}
        >
          좋아요
        </div>
      </div>
    </div>
  );
};
