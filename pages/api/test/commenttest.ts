import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    const comment = await prisma.comment.create({
      data: {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        message: req.body.message,
      },
    });
    res.status(200).json({ message: comment.id });
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
