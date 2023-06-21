import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

import client from '@/libs/prisma';
import { getProfileByUserId } from '@/libs/prisma/profile';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { authOptions } from '@/libs/server/auth';
import { withErrorHandling } from '@/libs/server/errorHandler';

const ParamsSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

type Params = z.infer<typeof ParamsSchema>;

// 유저 프로필 가져오기
const _GET = async (req: Request, params: Params) => {
  const {
    params: { userId },
  } = ParamsSchema.parse(params);

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    throw new NotFoundError({});
  }

  return NextResponse.json({ data: profile });
};

// 유저 프로필 업데이트
const _PUT = async (req: Request, params: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  const {
    params: { userId },
  } = ParamsSchema.parse(params);
  const profile = await getProfileByUserId(userId);
  if (!profile) {
    throw new NotFoundError({ resourceName: 'profile' });
  }

  if (profile.userId !== session.user.id) {
    throw new ForbiddenError();
  }

  const bodySchema = z.object({
    nameType: z.boolean(),
    nickname: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value !== null && value.length < 2) {
            return false;
          }
          return true;
        },
        { message: 'Nickname must be at least 2 characters' }
      ),
    description: z.string().nullable(),
    avatar: z.string(),
  });
  const body = await req.json();
  const { nameType, nickname, description, avatar } = bodySchema.parse(body);

  let isChanged = false;

  const updatedProfile = {
    nickname: profile.nickname,
    description: profile.description,
    nameType: profile.nameType, // true: 닉네임, false: 이름
    avatar: profile.avatar,
  };
  if (nameType !== profile.nameType) {
    isChanged = true;
    updatedProfile.nameType = nameType;
  }
  if (nameType === true && nickname !== profile.nickname) {
    isChanged = true;
    updatedProfile.nickname = nickname;
  }
  if (description !== profile.description) {
    isChanged = true;
    updatedProfile.description = description;
  }
  if (avatar !== profile.avatar) {
    isChanged = true;
    updatedProfile.avatar = avatar;
  }

  if (isChanged) {
    await client.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        ...updatedProfile,
      },
    });
  }

  return NextResponse.json({ message: 'successful' });
};

export const GET = withErrorHandling(_GET);
export const PUT = withErrorHandling(_PUT);
