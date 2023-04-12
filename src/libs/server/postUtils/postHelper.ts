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
