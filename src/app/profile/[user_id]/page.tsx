'use client';

import { ArticleCard } from '@/app/(community)/components/article_card';
import { Badge } from '@/app/_common/badge';
import { UserProfile } from '@/app/_common/profile/user_profile';
import { usePost } from '@/hooks/usePost';
import { useProfile } from '@/hooks/useProfile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.scss';

interface Props {
  params: {
    user_id: string;
  };
}

type Tab = 'posts' | 'comments';

export default function ProfilePage({ params: { user_id } }: Props) {
  const { data: session, status } = useSession();
  const { profile } = useProfile(user_id);
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('posts');

  const { post } = usePost(52); // 임시

  if (!profile) {
    return <div>이 페이지는 이용할 수 없습니다.</div>;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profileContainer}>
        <UserProfile profile={profile} size={'lg'} />
        <div className={styles.description}>한줄 소개 ..... </div>
        <div className={styles.tagSection}>
          <p>관심 주제</p>
          <div className={styles.tagList}>
            <Badge text={'개발'} />
            <Badge text={'데이터'} />
            {profile.interestTags.map((tag, idx) => {
              return <Badge key={idx} text={tag.title} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.RecentActivity}>
        <div className={styles.header}>
          <ul className={styles.tabs}>
            <li
              onClick={() => setTab('posts')}
              className={tab === 'posts' ? styles.selected : ''}
            >
              작성글
            </li>
            <li
              onClick={() => setTab('comments')}
              className={tab === 'comments' ? styles.selected : ''}
            >
              작성댓글
            </li>
          </ul>
        </div>

        <div>{post && <ArticleCard article={post} />}</div>
      </div>
    </main>
  );
}
