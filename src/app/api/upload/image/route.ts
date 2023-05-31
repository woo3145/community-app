import { InternalServerError } from '@/libs/server/apiErrors';
import { upload } from '@/libs/server/s3';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    // route handlers에선 웹 표준 API Request객체를 따름
    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return InternalServerError();
    }

    const filePath = await upload(file);

    return NextResponse.json({
      message: 'successful',
      data: filePath,
    });
  } catch (e) {
    return InternalServerError();
  }
};
