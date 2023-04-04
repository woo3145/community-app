'use client';

import { usePosts } from '@/hooks/usePosts';
import { MyNavigation } from '../../components/myNavigation';

import styles from '../page.module.scss';
import { PostItem } from '@/app/_components/organisms/PostItem';

export default function MyPagePosts() {
  const { data, isLoading } = usePosts(); // 임시
  return (
    <div className={styles.wrapper}>
      <MyNavigation tab="posts" />
      <div>
        {isLoading ? (
          <div>loading..</div>
        ) : (
          <div>
            {data.map((page) =>
              page.posts.map((post) => {
                return <PostItem key={post.id} post={post} />;
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
