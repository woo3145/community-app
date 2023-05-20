import { NextApiRequest, NextApiResponse } from 'next';

import { withErrorHandling } from '@/libs/server/errorHandler';

import client from '@/libs/prisma';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import {
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from '@/libs/server/customErrors';
import { LikePostBody } from '@/interfaces/api';

const parseQuery = (query: any) => {
  const { postId } = query;

  return {
    postId: postId ? parseInt(postId) : -1,
  };
};

const allowedMethods = ['GET', 'PUT'];

async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse,
  postId: number
) {
  const likeCount = await client.likedPost.count({
    where: { postId },
  });
  return res.status(200).json({ message: 'successful', data: likeCount });
}

async function handlePUT(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  postId: number
) {
  // 받아온 값 상태가 되도록 db에 저장
  const { isLiked } = req.body as LikePostBody;

  // 유저가 좋아요를 누른 상태인지
  const existLike = await client.likedPost.findFirst({
    where: {
      userId: session.user.id,
      postId: postId,
    },
  });

  // 좋아요 추가
  if (isLiked && !existLike) {
    const newLike = await client.likedPost.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        post: {
          connect: { id: postId },
        },
      },
    });

    await client.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: { connect: { id: newLike.id } },
      },
    });
    // 좋아요 삭제
  } else if (!isLiked && existLike) {
    await client.likedPost.delete({
      where: {
        id: existLike.id,
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
  const { postId } = parseQuery(req.query);

  // 게시글 좋아요 개수 가져오기
  if (req.method === 'GET') {
    return handleGET(req, res, postId);
  }

  // 게시글 좋아요
  if (req.method === 'PUT') {
    if (!session) {
      throw new UnauthorizedError();
    }
    return handlePUT(req, res, session, postId);
  }
}

export default withErrorHandling(handler);
