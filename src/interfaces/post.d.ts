import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { getPostById } from '@/libs/prisma/post';

export type FetchedPost = Exclude<
  Awaited<ReturnType<typeof getPostById>>,
  null
>;
export type PostWithIsLikedAndIsCommented = ReturnType<
  typeof addIsLikedAndIsCommented
>;
