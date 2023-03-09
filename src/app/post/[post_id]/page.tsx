'use client';

import { DeletedProfile } from '@/app/_common/profile/deleted_profile';
import { UserProfile } from '@/app/_common/profile/user_profile';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import useSWR, { Fetcher } from 'swr';
import { CommentsContainer } from './components/commentsContainer';
import { PostContents } from './components/postContents';
import styles from './page.module.scss';

interface GetPostsResponse {
  post: Article;
}

const fetcher: Fetcher<GetPostsResponse> = (url: string) =>
  fetch(url).then((res) => res.json());

export default function PostDetail({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const { data } = useSWR<GetPostsResponse>(`/api/posts/${post_id}`, fetcher);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            {data.post.userId ? (
              <UserProfile userId={data.post.userId} />
            ) : (
              <DeletedProfile />
            )}
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContents article={data.post} />
          {data.post.tags?.map((tag, key) => {
            return <div key={key}>{tag.title}</div>;
          })}
          <div className={styles.bottom}>
            {/* Like Button */}
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>{data.post.likeCount}</span>
            </div>

            {/* Comment Button */}
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>{data.post.commentCount}</span>
            </div>
          </div>
        </article>

        <CommentsContainer postId={post_id} />
      </section>
    </main>
  );
}
