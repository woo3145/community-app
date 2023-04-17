import client from '@/libs/server/prismaClient';
import { getProfileInclude } from '../profileUtils/profileFetch';
import { FetchedPost } from './postFetchTypes';

export const parseFetchPostQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const {
    tag_id,
    page: _page,
    limit: _limit,
    postId: _postId,
    userId: _userId,
  } = query as {
    tag_id: string | undefined;
    page: string | undefined;
    limit: string | undefined;
    postId: string | undefined;
    userId: string | undefined;
  };

  const tagId = tag_id !== undefined ? parseInt(tag_id) : -1;
  const page = _page !== undefined ? parseInt(_page) : 0;
  const limit = _limit !== undefined ? parseInt(_limit) : 15;
  const postId = _postId !== undefined ? parseInt(_postId) : -1;
  const userId = _userId !== undefined ? _userId : '';

  return { tagId, page, limit, postId, userId };
};

export const getPostInclude = () => {
  return {
    tags: true,
    user: {
      select: {
        profile: {
          include: getProfileInclude(),
        },
      },
    },
    likes: {
      select: {
        userId: true,
      },
    },
    comments: {
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        comments: true,
        likes: true,
      },
    },
  };
};

export const fetchPostsByTagId = async (
  tagId: number,
  page: number,
  limit: number
) => {
  if (tagId && tagId !== -1) {
    const tag = await client.tag.findFirst({
      where: { id: tagId },
      include: {
        posts: {
          skip: page * limit,
          take: limit,
          orderBy: {
            createAt: 'desc',
          },
          include: getPostInclude(),
        },
      },
    });
    return tag ? tag.posts : [];
  }

  const posts = await client.post.findMany({
    skip: page * limit,
    take: limit,
    where: {
      published: true,
    },
    orderBy: {
      createAt: 'desc',
    },
    include: getPostInclude(),
  });
  return posts;
};

export const fetchPostsByUserId = async (
  userId: string,
  page: number,
  limit: number
) => {
  const posts = await client.post.findMany({
    skip: page * limit,
    take: limit,
    where: {
      userId: userId,
    },
    orderBy: {
      createAt: 'desc',
    },
    include: getPostInclude(),
  });

  return posts;
};

export const fetchPost = async (postId: number) => {
  const post = await client.post.findUnique({
    where: { id: postId },
    include: getPostInclude(),
  });

  return post;
};

export const addIsLikedAndIsCommented = (
  post: FetchedPost,
  userId: string | undefined
) => {
  return {
    ...post,
    isLiked: post.likes.some((like) => like.userId === userId),
    isCommented: post.comments.some((comment) => comment.userId === userId),
  };
};
