import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { post } = req.query;
    prisma.$connect();
    try {
      const fetchpost = await prisma.post.findFirstOrThrow({
        where: {
          at: post as string,
        },
        include: {
          user: {
            select: {
              name: true,
              lastname: true,
              profilePic: true,
              at: true,
            },
          },
        },
      });
      res.status(200).json({ fetchpost });
    } catch (e) {
      res.status(404).json({ message: 'Post Not Found' });
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === 'POST') {
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else {
  }
  prisma.$disconnect();
}
