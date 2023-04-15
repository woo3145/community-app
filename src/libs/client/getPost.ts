import {
  GetPostIsLikedResponse,
  GetPostResponse,
  GetUserCommentsResponse,
} from '@/interfaces/api';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Post } from '../server/postUtils/postFetchTypes';

export const getPost = async (postId: number): Promise<Post> => {
  const session = await getServerSession(authOptions);

  const postRes = await fetch(`http://localhost:3000/api/posts/${postId}`);
  const { post }: GetPostResponse = await postRes.json();

  // 로그인한 경우 좋아요와 댓글 여부 확인
  if (session && session.user) {
    // 좋아요 여부 확인
    const postIsLikedRes = await fetch(
      `http://localhost:3000/api/user/${session.user.id}/likes/${post.id}`
    );
    const { isLiked }: GetPostIsLikedResponse = await postIsLikedRes.json();
    post.isLiked = isLiked;

    // 댓글 여부 확인
    const commentsRes = await fetch(
      `http://localhost:3000/api/user/${session.user.id}/comments`
    );
    const { comments }: GetUserCommentsResponse = await commentsRes.json();
    post.isCommented = comments.some((comment) => comment.postId === post.id);

    // 최근 본 글에 저장
    await fetch(
      `http://localhost:3000/api/user/${session.user.id}/recent/${post.id}`,
      {
        method: 'PUT',
      }
    );
  }

  return post;
};
