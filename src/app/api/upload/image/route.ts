import { NextResponse } from 'next/server';

import { NotFoundError } from '@/libs/server/customErrors';
import { withErrorHandling } from '@/libs/server/errorHandler';
import { upload } from '@/libs/server/s3';

const _POST = async (req: Request) => {
  // route handlers에선 웹 표준 API Request객체를 따름
  // https://developer.mozilla.org/en-US/docs/Web/API/Request
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file) {
    throw new NotFoundError({ resourceName: 'file' });
  }

  const filePath = await upload(file);

  return NextResponse.json({
    message: 'successful',
    data: filePath,
  });
};

export const POST = withErrorHandling(_POST);
