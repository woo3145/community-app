import { getServerSession } from 'next-auth';
import { createPost, getPostsByTagId } from '@/libs/prisma/post';
import { addIsLikedAndIsCommented } from '@/libs/dataHelper';
import { CreatePostBody } from '@/interfaces/api';
import { NextResponse } from 'next/server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { UnauthorizedError, ValidationError } from '@/libs/server/apiErrors';

const getParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const tagId = searchParams.get('tag_id') || '0';
  const page = searchParams.get('page') || '0';
  const limit = searchParams.get('limit') || '15';

  return {
    tagId: parseInt(tagId),
    page: parseInt(page),
    limit: parseInt(limit),
  };
};

// 게시물 목록 가져오기
export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  const { tagId, page, limit } = getParams(req);
  const posts = await getPostsByTagId(tagId, page, limit);
  const postsWithIsLiked = posts.map((post) =>
    addIsLikedAndIsCommented(post, session?.user.id)
  );

  return NextResponse.json({ data: postsWithIsLiked });
};

// 게시물 작성
export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }
  const body: CreatePostBody = await req.json();
  const { title, content, published, tags, imageUrl } = body;

  if (tags.length === 0 || 3 < tags.length) {
    return ValidationError();
  }
  if (!title) {
    return ValidationError();
  }
  if (!content) {
    return ValidationError();
  }

  const newPost = await createPost(session.user.id, {
    title,
    content,
    published,
    tags,
    imageUrl,
  });

  return NextResponse.json({ data: newPost.id });
};
