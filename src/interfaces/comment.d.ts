import { ArrayElement } from '@/libs/typeHelper';
import { fetchCommentsByPostId } from './commentFetch';
import { getCommentsByPostId } from '@/libs/prisma/comment';

export type Comments = Awaited<ReturnType<typeof getCommentsByPostId>>;
export type Comment = ArrayElement<Comments>;
