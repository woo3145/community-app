import { ArrayElement } from '@/libs/typeHelper';
import { addIsLikedAndIsCommented, fetchPostsByTagId } from './postFetch';

export type FetchedPosts = Awaited<ReturnType<typeof fetchPostsByTagId>>;
export type FetchedPost = ArrayElement<FetchedPosts>;
export type Post = ReturnType<typeof addIsLikedAndIsCommented>;
