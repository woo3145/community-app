import { HttpError, withErrorHandling } from '@/libs/server/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';

import client from '@/libs/server/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

interface EditProfileBody {
  nameType: boolean;
  nickname: string;
  description: string;
  avatar: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'PUT') {
    if (!session) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { nameType, nickname, description, avatar } =
      req.body as EditProfileBody;

    const profile = await client.profile.findUnique({
      where: { userId: session.user.id },
    });
    if (!profile) {
      throw new HttpError(404, '프로필을 찾을 수 없습니다.');
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
    if (avatar) {
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

  throw new HttpError(404, 'Not found');
}

export default withErrorHandling(handler);
