import client from '@/libs/server/prismaClient';
import { getProfileInclude } from '../profileUtils/profileFetch';
import { FetchedPost } from './postFetchTypes';

export const parseFetchPostQueryParams = (
  query: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const {
    tag_id,
    page: _page,
    limit: _limit,
    postId: _postId,
    userId: _userId,
  } = query as {
    tag_id: string | undefined;
    page: string | undefined;
    limit: string | undefined;
    postId: string | undefined;
    userId: string | undefined;
  };

  const tagId = tag_id !== undefined ? parseInt(tag_id) : -1;
  const page = _page !== undefined ? parseInt(_page) : 0;
  const limit = _limit !== undefined ? parseInt(_limit) : 15;
  const postId = _postId !== undefined ? parseInt(_postId) : -1;
  const userId = _userId !== undefined ? _userId : '';

  return { tagId, page, limit, postId, userId };
};
