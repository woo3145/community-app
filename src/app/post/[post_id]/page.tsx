import Badge from '@/app/_components/atoms/Badge';
import { UserProfile } from '@/app/_components/molecules/profile/UserProfile';
import { CommentList } from '@/app/_components/organisms/CommentList';
import Link from 'next/link';
import { PostContent } from '@/app/_components/molecules/PostContent';
import { PostLikeButton } from './PostLikeButton';
import { PostCommentButton } from './CommentButton';

import { Metadata } from 'next';
import { _getPost } from '@/libs/client/apis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import styles from './page.module.scss';
import { addIsLikedAndIsCommented } from '@/libs/server/postUtils/postFetch';

export async function generateMetadata({
  params: { post_id },
}: {
  params: { post_id: number };
}): Promise<Metadata> {
  const { data: post } = await _getPost(post_id);

  return {
    title: post.title,
    description: post.content,
  };
}

export default async function PostDetail({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const session = await getServerSession(authOptions);
  const { data: _post } = await _getPost(post_id);
  const post = addIsLikedAndIsCommented(_post, session?.user.id);

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            <Link href={`/profile/${post.user?.profile?.userId}`}>
              <UserProfile isLoading={false} profile={post.user?.profile} />
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
          <PostContent isLoading={false} post={post} />

          <div className={styles.tagList}>
            {post.tags?.map((tag, idx) => {
              return (
                <Badge
                  isLoading={false}
                  key={idx}
                  href={`/post/${tag.id}`}
                  text={tag.title}
                />
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
