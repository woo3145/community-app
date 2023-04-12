import { ArrayElement } from '@/libs/typeHelper';
import { fetchCommentsByPostId } from './commentFetch';

export type Comments = Awaited<ReturnType<typeof fetchCommentsByPostId>>;
export type Comment = ArrayElement<Comments>;
