import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || '';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
const AWS_REGION = process.env.AWS_REGION || '';

export const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

export const upload = async (file: File): Promise<string> => {
  // s3에 업로드 하기 위해 파일 포맷을 변경시켜줌 File => Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 11)}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
      Key: fileName,
      Body: buffer,
      ContentLength: file.size,
    })
  );

  const filePath = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`;

  return filePath;
};
