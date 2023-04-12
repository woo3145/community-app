'use client';

import Badge from '@/app/_components/atoms/Badge';
import { useMe } from '@/hooks/useMe';
import { usePost } from '@/hooks/usePost';
import { useRouter } from 'next/navigation';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useSWRConfig } from 'swr';
import { UserProfile } from '@/app/_components/molecules/profile/UserProfile';
import { useState } from 'react';
import styles from './page.module.scss';
import { CommentList } from '@/app/_components/organisms/CommentList';
import Link from 'next/link';
import { PostContent } from '@/app/_components/molecules/PostContent';

export default function PostDetail({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const router = useRouter();
  const { post, isLoading } = usePost(post_id);
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
          isLiked: post?.isLiked ? true : false,
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
            <Link href={`/profile/${post.user?.profile?.userId}`}>
              <UserProfile profile={post.user?.profile} />
            </Link>
          </div>
          <div className={styles.postCount}>
            {/* Like Button */}
            <div
              onClick={onClickLike}
              className={`${styles.likeButton} ${
                post.isLiked ? styles.isLiked : ''
              }`}
            >
              <AiOutlineLike />
              <span>{post._count.likes}</span>
            </div>

            {/* Comment Button */}
            <div
              className={`${styles.commentButton} ${
                post.isCommented ? styles.isCommented : ''
              }`}
            >
              <IoChatbubbleOutline />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContent post={post} />
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
                post.isLiked ? styles.isLiked : ''
              }`}
            >
              <AiOutlineLike />
              <span>{post._count.likes}</span>
            </div>

            {/* Comment Button */}
            <div
              className={`${styles.commentButton} ${
                post.isCommented ? styles.isCommented : ''
              }`}
            >
              <IoChatbubbleOutline />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </article>

        <CommentList postId={post_id} />
      </section>
    </main>
  );
}
