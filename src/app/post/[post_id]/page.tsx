import { Metadata } from 'next';
import { _getPost } from '@/libs/client/apis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { getPostById } from '@/libs/prisma/post';
import {
  FetchedPost,
  PostWithIsLikedAndIsCommented,
} from '@/libs/prisma/dataTypes';
import { PostSideSection } from './_components/PostSideSection';
import { CreateCommentContainer } from './_components/CreateCommentContainer';
import { CommentListContainer } from './_components/CommentListContainer';
import { PostContainer } from './_components/PostContainer';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';

const getPost = async (postId: string) => {
  const post = await getPostById(parseInt(postId));

  if (!post) {
    throw new Error('Failed to fetch data');
  }

  return post;
};

export async function generateMetadata({
  params: { post_id },
}: {
  params: { post_id: string };
}): Promise<Metadata> {
  // generateMetadata에서 에러를 발생시키면 ErrorBoundary에서 잡아내지 않음
  try {
    const post = await getPost(post_id);

    return {
      title: post.title,
      description: post.content,
    };
  } catch (e) {
    return {
      title: 'error',
      description: 'error',
    };
  }
}

export default async function PostDetail({
  params: { post_id },
}: {
  params: { post_id: string };
}) {
  const session = await getServerSession(authOptions); // 세션 확인
  const _post: FetchedPost = await getPost(post_id); // SSR요청

  // 세션의 유저아이디로 게시글 좋아요 여부와 댓글 여부 확인하여 필드를 포함한 새 객체 생성
  const post: PostWithIsLikedAndIsCommented = addIsLikedAndIsCommented(
    _post,
    session?.user.id
  );

  return (
    <main className="container flex max-w-screen-lg py-20">
      <aside className="shrink-0 w-[258px] relative">
        <PostSideSection post={post} />
      </aside>
      <section className="relative card">
        <PostContainer post={post} />
        <CommentListContainer postId={parseInt(post_id)} />
        <CreateCommentContainer postId={parseInt(post_id)} />
      </section>
    </main>
  );
}
