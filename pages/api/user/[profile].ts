import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    console.log('called me');
    const { profile } = req.query;
    prisma.$connect();
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          at: profile as string,
        },
      });
      res.status(200).json({ user });
    } catch (e) {
      res.status(404).json({ message: 'User Not Found' });
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === 'POST') {
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
  prisma.$disconnect();
}
