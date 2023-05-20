import client from './index';

export const getTags = async () => {
  const tags = await client.tag.findMany({
    where: {
      parentId: null,
    },
    include: {
      subTags: true,
    },
  });
  return tags;
};
