import client from '@/libs/server/prismaClient';
import { DEFAULT_TAG } from 'cypress/constants';

export default async function seedDB() {
  const seed = async () => {
    await client.tag.createMany({
      data: DEFAULT_TAG,
    });
  };

  return seed;
}
