import { CustomError } from './customErrors';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// API 에러 핸들러
export function handleError(error: unknown) {
  // zod 에러 핸들링
  if (error instanceof z.ZodError) {
    return NextResponse.json({ message: error.message }, { status: 400 });

    // CustomError 핸들링
  } else if (error instanceof CustomError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  } else {
    // 예상치 못한 에러
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export function withErrorHandling(
  handler: (req: Request, ...rest: any) => Promise<NextResponse>
) {
  return async (req: Request, ...rest: any) => {
    try {
      return await handler(req, rest);
    } catch (e) {
      return handleError(e);
    }
  };
}
