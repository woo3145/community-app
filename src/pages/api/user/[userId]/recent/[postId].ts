import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';
import { updatePostViewed } from '@/libs/server/postUtils/postHelper';

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
    const { userId, postId } = parseQueryParams(req.query);
    await updatePostViewed(userId, postId);
    return res.status(200).json({ message: 'success' });
  }

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
