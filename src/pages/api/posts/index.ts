import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import {
  addIsLikedAndIsCommented,
  fetchPostsByTagId,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import { CreatePostBody, createPost } from '@/libs/server/postUtils/postHelper';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const { tagId, page, limit } = parseFetchPostQueryParams(req.query);

    const posts = await fetchPostsByTagId(tagId, page, limit);
    const postsWithIsLiked = posts.map((post) => {
      return addIsLikedAndIsCommented(post, session?.user.id);
    });

    return res.status(200).json({ data: postsWithIsLiked });
  }

  if (req.method === 'POST') {
    if (!session) {
      throw new UnauthorizedError();
    }

    const { title, content, published, tags, imageUrl } =
      req.body as CreatePostBody;

    const newPost = await createPost(session.user.id, {
      title,
      content,
      published,
      tags,
      imageUrl,
    });
    return res.status(200).json({ message: 'successful', data: newPost.id });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
