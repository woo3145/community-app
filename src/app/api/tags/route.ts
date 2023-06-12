import { NextResponse } from 'next/server';

import { getTags } from '@/libs/prisma/tag';
import { withErrorHandling } from '@/libs/server/errorHandler';

const _GET = async (req: Request) => {
  const tags = await getTags();

  return NextResponse.json({ data: tags });
};

export const GET = withErrorHandling(_GET);
