import client from '@/libs/server/prismaClient';
import { getProfileInclude } from '../profileUtils/profileFetch';
import { FetchedPost } from './postFetchTypes';

export const parseFetchPostQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const { tag_id, page, limit, postId } = query as {
    tag_id: string | undefined;
    page: string | undefined;
    limit: string | undefined;
    postId: string | undefined;
  };

  const intTagId = tag_id !== undefined ? parseInt(tag_id) : -1;
  const intPage = page !== undefined ? parseInt(page) : 0;
  const intLimit = limit !== undefined ? parseInt(limit) : 15;
  const intPostId = postId !== undefined ? parseInt(postId) : -1;

  return { intTagId, intPage, intLimit, intPostId };
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
  intTagId: number,
  intPage: number,
  intLimit: number
) => {
  if (intTagId && intTagId !== -1) {
    const tag = await client.tag.findFirst({
      where: { id: intTagId },
      include: {
        posts: {
          skip: intPage * intLimit,
          take: intLimit,
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
    skip: intPage * intLimit,
    take: intLimit,
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
  intPage: number,
  intLimit: number
) => {
  const posts = await client.post.findMany({
    skip: intPage * intLimit,
    take: intLimit,
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
