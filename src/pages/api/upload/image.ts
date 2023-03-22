import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { upload } from '@/libs/server/multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import nextConnect, { NextHandler } from 'next-connect';
import { authOptions } from '../auth/[...nextauth]';

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new HttpError(401, 'Unauthorized');
  }
  next();
});

handler.use(upload.single('image'));

handler.post((req: NextApiRequest & { file: any }, res: NextApiResponse) => {
  const filePath = req.file.location;

  return res.status(200).json({ message: 'successful', filePath });
});

export default withErrorHandling(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
