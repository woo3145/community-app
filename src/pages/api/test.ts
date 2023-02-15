// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/server/prismaClient';

type Data = {
  name: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await client.user.create({
    data: {
      email: 'test5@gmail.com',
      name: 'woo3145',
    },
  });
  console.log(result);
  res.status(200).json({ name: result.name || 'ss', email: result.email });
}
