import client from '../../src/libs/server/prismaClient';

export default async function resetDB() {
  await client.post.deleteMany({});
  await client.tag.deleteMany({});
  await client.user.deleteMany({});

  return null;
}
