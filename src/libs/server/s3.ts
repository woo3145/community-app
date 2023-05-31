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

const getContentType = (fileExtension: string): string => {
  const mimeTypeMap: { [key: string]: string } = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  };

  return mimeTypeMap[fileExtension.toLowerCase()] || 'application/octet-stream';
};

export const upload = async (file: File): Promise<string> => {
  // s3에 업로드 하기 위해 파일 포맷을 변경시켜줌 File => Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 파일 확장자 추출
  const fileExtension = file.name.split('.').pop() || '';
  const fileName = `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 11)}.${fileExtension}`;

  // 확장자를 기반으로 contentType 생성
  const contentType = getContentType(fileExtension);

  // s3에 업로드
  await s3.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      ContentType: contentType,
      ACL: 'public-read',
      Key: fileName,
      Body: buffer,
      ContentLength: file.size,
    })
  );

  const filePath = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`;

  return filePath;
};
