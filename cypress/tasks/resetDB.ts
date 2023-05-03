import client from '@/libs/server/prismaClient';

export default async function resetDB() {
  const reset = async () => {
    await client.post.deleteMany({});
    await client.tag.deleteMany({});
    await client.user.deleteMany({});
  };

  return reset;
}
