import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    const commentLike = await prisma.commentLike.create({
      data: {
        comment_id: req.body.comment_id,
        user_id: req.body.user_id,
        vote: req.body.vote,
      },
    });
    res.status(200).json({ message: commentLike.id });
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
