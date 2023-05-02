import { GetPostResponse } from '@/interfaces/api';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Post } from '../server/postUtils/postFetchTypes';
import {
  _getPost,
  _getPostIsLiked,
  _getUserComments,
  _saveRecentPost,
} from './apis';

export const getPost = async (postId: number): Promise<Post> => {
  const session = await getServerSession(authOptions);

  const { data: post }: GetPostResponse = await _getPost(postId);

  // 로그인한 경우 좋아요와 댓글 여부 확인
  if (session && session.user) {
    // 좋아요 여부 확인
    const { data: isLiked } = await _getPostIsLiked(session.user.id, post.id);
    post.isLiked = isLiked;

    // 댓글 여부 확인
    const { data: comments } = await _getUserComments(session.user.id);
    post.isCommented = comments.some((comment) => comment.postId === post.id);

    // 최근 본 글에 저장
    await _saveRecentPost(session.user.id, post.id);
  }
  return post;
};
