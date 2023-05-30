import { NextResponse } from 'next/server';

export const ValidationError = () => {
  return NextResponse.json({ message: `Bad Request` }, { status: 400 });
};

export const UnauthorizedError = () => {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
};

export const ForbiddenError = () => {
  return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
};

export const NotFoundError = () => {
  return NextResponse.json({ message: 'Not Found' }, { status: 404 });
};

export const InternalServerError = () => {
  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 }
  );
};
