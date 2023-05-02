import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/server/prismaClient';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';
import { getCommentsInclude } from '@/libs/server/commentUtils/commentFetch';

interface CreateCommentBody {
  postId: string;
  content: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      throw new UnauthorizedError();
    }

    const { content, postId } = req.body as CreateCommentBody;
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
      include: getCommentsInclude(),
    });

    return res.status(200).json({ message: 'successful', data: newComment });
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
