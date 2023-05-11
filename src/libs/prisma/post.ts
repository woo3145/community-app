import { getPostInclude } from './dataShapes';
import client from './index';

export const getPostById = async (postId: number) => {
  const post = await client.post.findUnique({
    where: { id: postId },
    include: getPostInclude(),
  });

  return post;
};
