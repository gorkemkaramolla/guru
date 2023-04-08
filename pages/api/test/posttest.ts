import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    const post = await prisma.post.create({
      data: {
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.status(200).json({ message: post.id });
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
