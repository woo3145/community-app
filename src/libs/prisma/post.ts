import { CreatePostBody } from '@/interfaces/api';
import { getPostInclude } from './dataShapes';
import client from './index';

export const getPostById = async (postId: number) => {
  const post = await client.post.findUnique({
    where: { id: postId },
    include: getPostInclude(),
  });

  return post;
};

export const getPostsByTagId = async (
  tagId: number,
  page: number,
  limit: number
) => {
  if (tagId !== 0 && tagId !== -1) {
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

export const getPostsByUserId = async (
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

export const createPost = async (
  userId: string,
  { title, content, published, imageUrl, tags }: CreatePostBody
) => {
  const newPost = await client.post.create({
    data: {
      title,
      content,
      published: published === true ? true : false,
      imageUrl,
      user: {
        connect: {
          id: userId,
        },
      },
      tags: {
        connect: tags.map((tagId: number) => {
          return {
            id: tagId,
          };
        }),
      },
    },
  });

  return newPost;
};

export const getLikedPostsByUserId = async (
  userId: string,
  page: number,
  limit: number
) => {
  const likedPosts = await client.likedPost.findMany({
    skip: page * limit,
    take: limit,
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      createdAt: true,
      post: {
        include: getPostInclude(),
      },
    },
  });

  return likedPosts;
};

export const getRecentlyViewedPostsByUserId = async (
  userId: string,
  page: number,
  limit: number
) => {
  const views = await client.view.findMany({
    skip: page * limit,
    take: limit,
    where: {
      userId: userId,
    },
    orderBy: {
      viewedAt: 'desc',
    },
    select: {
      viewedAt: true,
      post: {
        include: getPostInclude(),
      },
    },
  });

  return views;
};
