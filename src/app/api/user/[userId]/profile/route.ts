import { EditProfileBody } from '@/interfaces/api';
import { getProfileByUserId } from '@/libs/prisma/profile';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/apiErrors';
import { NextResponse } from 'next/server';
import client from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/server/auth';

interface Params {
  params: {
    userId: string;
  };
}

// 유저 프로필 가져오기
export const GET = async (req: Request, { params }: Params) => {
  const { userId } = params;

  const profile = await getProfileByUserId(userId);

  if (!profile) {
    return NotFoundError();
  }

  return NextResponse.json({ data: profile });
};

// 유저 프로필 업데이트
export const PUT = async (req: Request, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return UnauthorizedError();
  }

  const { userId } = params;

  const profile = await getProfileByUserId(userId);
  if (!profile) {
    return NotFoundError();
  }

  if (profile.userId !== session.user.id) {
    return ForbiddenError();
  }

  const body: EditProfileBody = await req.json();
  const { nameType, nickname, description, avatar } = body;

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
