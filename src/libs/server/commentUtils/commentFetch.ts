import client from '@/libs/server/prismaClient';
import { getProfileInclude } from '../profileUtils/profileFetch';

export const parseFetchCommentsQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const {
    userId: _userId,
    postId: _postId,
    page: _page,
    limit: _limit,
  } = query as {
    userId: string | undefined;
    postId: string | undefined;
    page: string | undefined;
    limit: string | undefined;
  };
  const userId = _userId !== undefined ? _userId : '';
  const postId = _postId !== undefined ? parseInt(_postId) : -1;
  const page = _page !== undefined ? parseInt(_page) : undefined;
  const limit = _limit !== undefined ? parseInt(_limit) : undefined;

  return { userId, postId, page, limit };
};

export const getCommentsInclude = () => {
  return {
    user: {
      select: {
        profile: {
          include: getProfileInclude(),
        },
      },
    },
  };
};

// 게시글의 댓글 목록 ( asc )
export const fetchCommentsByPostId = async (postId: number) => {
  const comments = await client.comment.findMany({
    where: { postId: postId },
    orderBy: {
      createAt: 'asc',
    },
    include: getCommentsInclude(),
  });

  return comments;
};

// 프로필 페이지의 댓글 목록 ( desc ), + 댓글여부 확인할 때도 씀(페이지네이션 X)
export const fetchCommentsByUserId = async (
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
      include: getCommentsInclude(),
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
      include: getCommentsInclude(),
    });

    return comments;
  }
};
