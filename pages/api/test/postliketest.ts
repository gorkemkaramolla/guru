import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    const postLike = await prisma.postLike.create({
      data: {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        vote: req.body.vote,
      },
    });
    res.status(200).json({ message: postLike.id });
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
