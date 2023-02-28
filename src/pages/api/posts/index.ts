import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

interface CreatePostBody {
  title: string;
  content: string;
  published: boolean;
  tags?: any; // 임시
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      where: {
        published: true,
      },
      include: {
        user: {
          select: {
            profile: true,
          },
        },
      },
    });

    return res.status(200).json({ posts });
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { title, content, published, tags } = req.body as CreatePostBody;

    const newPost = await client.post.create({
      data: {
        title,
        content,
        published: true,
        user: {
          connect: {
            email: session.user?.email as string,
          },
        },
      },
    });

    return res.status(200).json({ message: 'successful', newPost });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
