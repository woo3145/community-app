import client from '../../src/libs/server/prismaClient';
import { DEFAULT_TAG } from '../constants';

export default async function seedDB() {
  await client.tag.createMany({
    data: DEFAULT_TAG,
  });

  return null;
}
