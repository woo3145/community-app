'use client';

import { DeletedProfile } from '@/app/_common/profile/deleted_profile';
import { UserProfile } from '@/app/_common/profile/user_profile';
import { useMe } from '@/hooks/useMe';
import { usePost } from '@/hooks/usePost';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useSWRConfig } from 'swr';
import { CommentsContainer } from './components/commentsContainer';
import { PostContents } from './components/postContents';
import styles from './page.module.scss';

export default function PostDetail({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
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
            {post.userId ? (
              <UserProfile userId={post.userId} />
            ) : (
              <DeletedProfile />
            )}
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
          <PostContents article={post} />
          <div className={styles.tagList}>
            {post.tags?.map((tag, key) => {
              return (
                <Link href={`/${tag.id}`} key={key} className={styles.tagItem}>
                  {tag.title}
                </Link>
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
