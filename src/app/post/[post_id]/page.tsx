'use client';

import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import useSWR, { Fetcher } from 'swr';
import { CommentsContainer } from './components/commentsContainer';
import { PostContents } from './components/postContents';
import { SideAuthorBox } from './components/sideAuthor_box';
import styles from './page.module.scss';

interface GetPostsResponse {
  post: IArticle;
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
  console.log(data.post);
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            <SideAuthorBox author={data.post.user} />
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContents article={data.post} />

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

        <CommentsContainer />
      </section>
    </main>
  );
}
