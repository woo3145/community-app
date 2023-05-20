import client from '../../src/libs/prisma';
import { DEFAULT_TAG } from '../constants';

export default async function seedDB() {
  await client.tag.createMany({
    data: DEFAULT_TAG,
  });

  return null;
}
