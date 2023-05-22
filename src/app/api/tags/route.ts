import { getTags } from '@/libs/prisma/tag';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const tags = await getTags();

  return NextResponse.json({ data: tags });
};
