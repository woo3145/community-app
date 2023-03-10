import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Post } from '@prisma/client';

interface CreatePostBody {
  title: string;
  content: string;
  published: boolean;
  imageUrl: string;
  tags: number[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { tag_id } = req.query as { tag_id: string };
    let posts: Post[] = [];

    if (tag_id && tag_id !== 'all') {
      const tag = await client.tag.findFirst({
        where: { id: parseInt(tag_id) },
        include: {
          posts: {
            orderBy: {
              createAt: 'desc',
            },
          },
        },
      });
      posts = tag ? tag.posts : [];
    } else {
      posts = await client.post.findMany({
        where: {
          published: true,
        },
        orderBy: {
          createAt: 'desc',
        },
      });
    }

    return res.status(200).json({ posts });
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { title, content, published, tags, imageUrl } =
      req.body as CreatePostBody;

    const newPost = await client.post.create({
      data: {
        title,
        content,
        published: published === true ? true : false,
        imageUrl,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        tags: {
          connect: tags.splice(0, 3).map((tagId: number) => {
            return {
              id: tagId,
            };
          }),
        },
      },
    });

    return res.status(200).json({ message: 'successful', postId: newPost.id });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
