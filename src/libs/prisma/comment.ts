import { getCommentInclude } from './dataShapes';
import client from './index';

// 댓글 하나 가져오기
export const getCommentById = async (commentId: number) => {
  const comment = await client.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  return comment;
};

// 게시글의 댓글 목록 ( asc )
export const getCommentsByPostId = async (postId: number) => {
  const comments = await client.comment.findMany({
    where: { postId: postId },
    orderBy: {
      createAt: 'asc',
    },
    include: getCommentInclude(),
  });

  return comments;
};

// 프로필 페이지의 댓글 목록 ( desc ), + 댓글여부 확인할 때도 씀(페이지네이션 X)
export const getCommentsByUserId = async (
  userId: string,
  page?: number,
  limit?: number
) => {
  // 페이지 네이션
  if (page !== undefined && limit !== undefined) {
    const comments = await client.comment.findMany({
      skip: page * limit,
      take: limit,
      where: {
        userId: userId,
      },
      orderBy: {
        createAt: 'desc',
      },
      include: getCommentInclude(),
    });

    return comments;
  } else {
    // 전체
    const comments = await client.comment.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createAt: 'desc',
      },
      include: getCommentInclude(),
    });

    return comments;
  }
};

// 댓글 생성
export const createComment = async (
  userId: string,
  postId: number,
  content: string
) => {
  const newComment = await client.comment.create({
    data: {
      content,
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
    include: {
      user: {
        select: {
          profile: true,
        },
      },
    },
  });

  return newComment;
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  await client.comment.delete({
    where: { id: commentId },
  });
};
