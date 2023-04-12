import client from '@/libs/server/prismaClient';
import { FetchedPost } from './postFetchTypes';

export const updatePostViewed = async (userId: string, postId: number) => {
  const viewd = await client.view.findFirst({
    where: {
      postId: postId,
      userId: userId,
    },
  });
  if (viewd) {
    await client.view.delete({
      where: {
        id: viewd.id,
      },
    });
  }

  await client.view.create({
    data: {
      postId: postId,
      userId: userId,
    },
  });
};

export interface CreatePostBody {
  title: string;
  content: string;
  published: boolean;
  imageUrl: string;
  tags: number[];
}

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
        connect: tags.splice(0, 3).map((tagId: number) => {
          return {
            id: tagId,
          };
        }),
      },
    },
  });

  return newPost;
};

export interface UpdatePostBody {
  title?: string;
  content?: string;
  published?: boolean;
  tags?: number[];
}

export const updatePost = async (
  post: FetchedPost,
  { title, content, published, tags }: UpdatePostBody
) => {
  if (title && post.title !== title) {
    await client.post.update({
      where: { id: post.id },
      data: {
        title,
      },
    });
  }
  if (content && post.content !== content) {
    await client.post.update({
      where: { id: post.id },
      data: {
        content,
      },
    });
  }
  if (published !== undefined && post.published !== published) {
    await client.post.update({
      where: { id: post.id },
      data: {
        published: published === true ? true : false,
      },
    });
  }
  if (tags) {
    const deleteTags = post.tags.filter((tag) => !tags.includes(tag.id));
    const addTags = tags.filter(
      (id) => !post.tags.map((tag) => tag.id).includes(id)
    );
    if (deleteTags.length === 0 && addTags.length === 0) return;

    await client.post.update({
      where: { id: post.id },
      data: {
        tags: {
          disconnect: deleteTags.map((tag) => {
            return {
              id: tag.id,
            };
          }),
          connect: addTags.map((tagId) => {
            return {
              id: tagId,
            };
          }),
        },
      },
    });
  }

  return;
};
