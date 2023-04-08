import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    const category = await prisma.category.create({
      data: {
        name: 'yazılım',
      },
    });
    res.status(200).json({ message: category.id });
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
