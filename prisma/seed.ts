import { PrismaClient } from '@prisma/client';
import { DEFAULT_TAG } from './constants';
const prisma = new PrismaClient();
async function main() {
  await prisma.tag.createMany({
    data: DEFAULT_TAG,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
