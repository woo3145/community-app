import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { updatePostViewed } from '@/libs/server/postUtils/postHelper';
import { NotFoundError } from '@/libs/server/customErrors';

const parseQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const { userId: _userId, postId: _postId } = query as {
    userId: string;
    postId: string;
  };
  const userId = _userId;
  const postId = parseInt(_postId);

  return { userId, postId };
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { userId, postId } = parseQueryParams(req.query);
      await updatePostViewed(userId, postId);
      return res.status(200).json({ message: 'success' });
    } catch (e) {
      console.log(e);
    }
  }

  throw new NotFoundError();
}

export default withErrorHandling(handler);
