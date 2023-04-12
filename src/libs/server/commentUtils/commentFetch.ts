import client from '@/libs/server/prismaClient';
import { getProfileInclude } from '../profileUtils/profileFetch';

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
