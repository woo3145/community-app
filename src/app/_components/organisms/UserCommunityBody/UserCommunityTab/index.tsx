import { Dispatch, SetStateAction } from 'react';

import styles from './styles.module.scss';
import { UserCommunityTabType } from '..';

interface Props {
  tab: UserCommunityTabType;
  setTab: Dispatch<SetStateAction<UserCommunityTabType>>;
}

export const UserCommunityTab = ({ tab, setTab }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
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
      </div>
    </div>
  );
};
