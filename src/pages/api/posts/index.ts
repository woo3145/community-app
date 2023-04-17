import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import {
  addIsLikedAndIsCommented,
  fetchPostsByTagId,
  parseFetchPostQueryParams,
} from '@/libs/server/postUtils/postFetch';
import { CreatePostBody, createPost } from '@/libs/server/postUtils/postHelper';

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
      throw new HttpError(401, 'Unauthorized');
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
    return res.status(200).json({ message: 'successful', postId: newPost.id });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
