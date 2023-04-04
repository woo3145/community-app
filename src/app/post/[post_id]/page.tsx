'use client';

import Badge from '@/app/_components/atoms/Badge';
import { useMe } from '@/hooks/useMe';
import { usePost } from '@/hooks/usePost';
import { useRouter } from 'next/navigation';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useSWRConfig } from 'swr';
import { CommentsContainer } from './components/commentsContainer';
import { PostContents } from './components/postContents';
import { UserProfile } from '@/app/_components/molecules/profile/UserProfile';
import { useState } from 'react';
import styles from './page.module.scss';

export default function PostDetail({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const router = useRouter();
  const { post, isLoading, isLiked } = usePost(post_id);
  const { mutate } = useSWRConfig();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { me } = useMe();

  const onClickLike = async () => {
    if (isApiLoading) {
      console.log('처리중입니다.');
      return;
    }
    if (!me) {
      console.log('로그인을 해주세요.');
      return;
    }
    setIsApiLoading(true);
    const response = await (
      await fetch(`/api/posts/${post_id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isLiked: isLiked,
        }),
      })
    ).json();

    if (response.error) {
      // 에러처리
      setIsApiLoading(false);
      return;
    }
    await mutate(`/api/posts/${post_id}`);
    setIsApiLoading(false);
  };

  if (!post || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            <UserProfile profile={post.user?.profile} />
          </div>
          <div className={styles.postCount}>
            {/* Like Button */}
            <div
              onClick={onClickLike}
              className={`${styles.likeButton} ${
                isLiked ? styles.isLiked : ''
              }`}
            >
              <AiOutlineLike />
              <span>{post._count.likes}</span>
            </div>

            {/* Comment Button */}
            <div className={styles.commentButton}>
              <IoChatbubbleOutline />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContents post={post} />
          <div className={styles.tagList}>
            {post.tags?.map((tag, idx) => {
              return (
                <Badge
                  key={idx}
                  onClick={() => router.push(`/${tag.id}`)}
                  text={tag.title}
                />
              );
            })}
          </div>
          <div className={styles.bottom}>
            {/* Like Button */}
            <div
              onClick={onClickLike}
              className={`${styles.likeButton} ${
                isLiked ? styles.isLiked : ''
              }`}
            >
              <AiOutlineLike />
              <span>{post._count.likes}</span>
            </div>

            {/* Comment Button */}
            <div className={styles.commentButton}>
              <IoChatbubbleOutline />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </article>

        <CommentsContainer postId={post_id} />
      </section>
    </main>
  );
}
