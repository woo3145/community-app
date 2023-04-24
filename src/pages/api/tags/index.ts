import { HttpError, withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

interface CreateTagBody {
  title: string;
  parentId?: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const tags = await client.tag.findMany({
      where: {
        parentId: null,
      },
      include: {
        subTags: true,
      },
    });

    return res.status(200).json({ message: 'successful', tags });
  }

  if (req.method === 'POST') {
    if (!session || session.user.id !== process.env.ADMIN_ID) {
      throw new HttpError(403, 'Forbidden');
    }

    const { title, parentId } = req.body as CreateTagBody;

    if (parentId !== undefined) {
      const parentTag = await client.tag.findUnique({
        where: { id: parentId },
      });

      if (!parentTag) {
        throw new HttpError(400, '부모 태그를 찾을 수 없습니다.');
      }

      await client.tag.update({
        where: {
          id: parentTag.id,
        },
        data: {
          subTags: {
            create: {
              title: title,
            },
          },
        },
      });
    } else {
      await client.tag.create({ data: { title } });
    }

    return res.status(200).json({ message: 'successful' });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
