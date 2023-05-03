import client from '@/libs/server/prismaClient';

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
