'use client';

import Badge from '@/app/_components/atoms/Badge';
import { usePost } from '@/hooks/usePost';
import { useProfile } from '@/hooks/swr/useProfile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.scss';
import { UserProfile } from '@/app/_components/molecules/profile/UserProfile';
import { PostItem } from '@/app/_components/molecules/PostItem';

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
        <div className={styles.description}>{profile.description}</div>
        <div className={styles.tagSection}>
          <p>관심 주제</p>
          <div className={styles.tagList}>
            {/* 임시 */}
            <Badge text={'개발'} />
            <Badge text={'데이터'} />
            {profile.interestTags.map((tag, idx) => {
              return <Badge key={idx} text={tag.title} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.body}>
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

        <div>{post && <PostItem post={post} />}</div>
      </div>
    </main>
  );
}
