import { withErrorHandling } from '@/libs/server/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NotFoundError, UnauthorizedError } from '@/libs/server/customErrors';

interface EditProfileBody {
  nameType: boolean;
  nickname: string;
  description: string;
  avatar: string | null;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'PUT') {
    if (!session) {
      throw new UnauthorizedError();
    }

    const { nameType, nickname, description, avatar } =
      req.body as EditProfileBody;

    const profile = await client.profile.findUnique({
      where: { userId: session.user.id },
    });
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
    // 아바타는 업로드 할때만 들어옴
    if (avatar !== null) {
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

  throw new NotFoundError();
}

export default withErrorHandling(handler);
