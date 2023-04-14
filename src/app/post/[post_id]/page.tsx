import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '@/app/_components/molecules/profile/UserProfile';
import { CommentList } from '@/app/_components/organisms/CommentList';
import Link from 'next/link';
import { PostContent } from '@/app/_components/molecules/PostContent';
import { getPost } from '@/libs/client/getPost';
import { PostLikeButton } from './PostLikeButton';
import { PostCommentButton } from './CommentButton';

import styles from './page.module.scss';

export default async function PostDetail({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const post = await getPost(post_id);

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
            <PostLikeButton
              postId={post.id}
              isLiked={post.isLiked}
              likeCount={post._count.likes}
            />

            {/* Comment Button */}
            <PostCommentButton
              postId={post.id}
              isCommented={post.isCommented}
              commentCount={post._count.comments}
            />
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContent post={post} />

          <div className={styles.tagList}>
            {post.tags?.map((tag, idx) => {
              return (
                <Badge key={idx} href={`/post/${tag.id}`} text={tag.title} />
              );
            })}
          </div>

          <div className={styles.bottom}>
            {/* Like Button */}
            <PostLikeButton
              postId={post.id}
              isLiked={post.isLiked}
              likeCount={post._count.likes}
            />
            {/* Comment Button */}
            <PostCommentButton
              postId={post.id}
              isCommented={post.isCommented}
              commentCount={post._count.comments}
            />
          </div>
        </article>

        <CommentList postId={post_id} />
      </section>
    </main>
  );
}
