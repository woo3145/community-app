import { NextResponse } from 'next/server';
import { isCustomError, isZodError } from '../typeGuards';

// API 에러 핸들러
export function handleError(error: unknown) {
  // zod 에러 핸들링
  if (isZodError(error)) {
    return NextResponse.json(
      { message: error.message, statusCode: 400 },
      { status: 400 }
    );

    // CustomError 핸들링
  } else if (isCustomError(error)) {
    return NextResponse.json(
      { message: error.message, statusCode: error.statusCode },
      { status: error.statusCode }
    );
  } else {
    // 예상치 못한 에러
    return NextResponse.json(
      { message: 'Internal Server Error', statusCode: 500 },
      { status: 500 }
    );
  }
}

export function withErrorHandling(
  handler: (req: Request, ...rest: any) => Promise<NextResponse>
) {
  return async (req: Request, ...rest: any) => {
    try {
      return await handler(req, ...rest);
    } catch (e) {
      return handleError(e);
    }
  };
}
