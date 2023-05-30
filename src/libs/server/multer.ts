import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from './s3';

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`);
    },
  }),
  limits: { fileSize: 12 * 1024 * 1024 },
});
