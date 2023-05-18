import Badge from '@/app/_components/atoms/Badge';
import { PostContent } from '@/app/_components/molecules/PostContent';
import { PostLikeButton } from './_components/PostLikeButton';
import { PostCommentButton } from './_components/CommentButton';

import { Metadata } from 'next';
import { _getPost } from '@/libs/client/apis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { addIsLikedAndIsCommented } from '@/libs/server/postUtils/postFetch';
import { getPostById } from '@/libs/prisma/post';
import {
  FetchedPost,
  PostWithIsLikedAndIsCommented,
} from '@/libs/prisma/dataTypes';
import { SideSection } from './_components/SideSection';
import { CreateCommentContainer } from './_components/CreateCommentContainer';
import { CommentListContainer } from './_components/CommentListContainer';
import { PostContainer } from './_components/PostContainer';

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
  const session = await getServerSession(authOptions);
  const _post: FetchedPost = await getPost(post_id);

  const post: PostWithIsLikedAndIsCommented = addIsLikedAndIsCommented(
    _post,
    session?.user.id
  );

  return (
    <main className="flex w-full max-w-screen-lg py-20">
      <aside className="shrink-0 w-[258px] relative">
        <SideSection post={post} />
      </aside>
      <section className="relative card">
        <PostContainer post={post} />

        <CommentListContainer postId={parseInt(post_id)} />
        <CreateCommentContainer postId={parseInt(post_id)} />
      </section>
    </main>
  );
}
