import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import {
  addIsLikedAndIsCommented,
  fetchPostsByTagId,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';

interface CreatePostBody {
  title: string;
  content: string;
  published: boolean;
  imageUrl: string;
  tags: number[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const { intTagId, intPage, intLimit } = parseFetchPostQueryParams(
      req.query
    );

    const posts = await fetchPostsByTagId(intTagId, intPage, intLimit);
    const postsWithIsLiked = posts.map((post) => {
      return addIsLikedAndIsCommented(post, session?.user.id);
    });

    return res.status(200).json({ posts: postsWithIsLiked });
  }

  if (req.method === 'POST') {
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
