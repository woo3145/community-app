import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import { createPost, getPostsByTagId } from '@/libs/prisma/post';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { authOptions } from '@/libs/server/auth';
import { withErrorHandling } from '@/libs/server/errorHandler';
import { UnauthorizedError } from '@/libs/server/customErrors';

const QueryParamsSchema = z.object({
  page: z
    .number()
    .optional()
    .transform((value) => (value ? value : 0)),
  limit: z
    .number()
    .optional()
    .transform((value) => (value ? value : 15)),
  tagId: z
    .number()
    .optional()
    .transform((value) => (value ? value : 0)),
});

const CreatePostInputSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  content: z.string().min(1, { message: 'Content is required' }),
  published: z.boolean(),
  tags: z
    .number()
    .array()
    .min(1, { message: 'The number of tags must be between 1 and 3.' })
    .max(3, { message: 'The number of tags must be between 1 and 3.' }),
  imageUrl: z.string(),
});

const getParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const tagId = searchParams.get('tag_id');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  return QueryParamsSchema.parse({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    tagId: tagId ? Number(tagId) : undefined,
  });
};

// 게시물 목록 가져오기
const _GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  const { tagId, page, limit } = getParams(req);
  const posts = await getPostsByTagId(tagId, page, limit);
  const postsWithIsLiked = posts.map((post) =>
    addIsLikedAndIsCommented(post, session?.user.id)
  );

  return NextResponse.json({ data: postsWithIsLiked });
};

// 게시물 작성
const _POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }
  const body = await req.json();
  const { title, content, published, tags, imageUrl } =
    CreatePostInputSchema.parse(body);

  const newPost = await createPost(session.user.id, {
    title,
    content,
    published,
    tags,
    imageUrl,
  });

  return NextResponse.json({ data: newPost.id });
};

export const GET = withErrorHandling(_GET);
export const POST = withErrorHandling(_POST);
