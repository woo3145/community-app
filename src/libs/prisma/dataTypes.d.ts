import { addIsLikedAndIsCommented } from '../dataHelper';
import { getPostById } from './post';

export type FetchedPost = Exclude<
  Awaited<ReturnType<typeof getPostById>>,
  null
>;
export type PostWithIsLikedAndIsCommented = ReturnType<
  typeof addIsLikedAndIsCommented
>;
