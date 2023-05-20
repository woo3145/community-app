import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { getProfileByUserId } from '@/libs/prisma/profile';
import { EditProfileBody } from '@/interfaces/api';
import client from '@/libs/prisma';

const allowedMethods = ['PUT'];

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  const { nameType, nickname, description, avatar } =
    req.body as EditProfileBody;

  const profile = await getProfileByUserId(session.user.id);
  if (!profile) {
    throw new NotFoundError('profile');
  }
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
  return res.status(200).json({ message: 'successful' });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method!)) {
    throw new MethodNotAllowedError();
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new UnauthorizedError();
  }

  // 내 프로필 수정
  if (req.method === 'PUT') {
    return handlePUT(req, res, session);
  }
}

export default withErrorHandling(handler);
