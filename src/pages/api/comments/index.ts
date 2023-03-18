import { NextApiRequest, NextApiResponse } from 'next';

import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

interface CreateCommentBody {
  postId: string;
  content: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { content, postId } = req.body as CreateCommentBody;
    console.log(content, postId);
    const newComment = await client.comment.create({
      data: {
        content,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: parseInt(postId),
          },
        },
      },
    });

    return res.status(200).json({ message: 'successful', comment: newComment });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
