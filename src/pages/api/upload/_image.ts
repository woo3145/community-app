import { withErrorHandling } from '@/libs/server/errorHandler';
import { upload } from '@/libs/server/multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import nextConnect from 'next-connect';
import { UnauthorizedError } from '@/libs/server/customErrors';
import { authOptions } from '@/libs/server/auth';

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
    throw new UnauthorizedError();
  }
  next();
});

handler.use(upload.single('image'));

handler.post((req: NextApiRequest & { file: any }, res: NextApiResponse) => {
  const filePath = req.file.location;
  return res.status(200).json({ message: 'successful', data: filePath });
});

export default withErrorHandling(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
