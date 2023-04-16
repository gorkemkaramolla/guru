import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { content, title, user_id, category_id } = req.body;
  console.log(req.body);

  if (req.method === 'GET') {
    prisma.$connect();

    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (e) {
      res.status(400).json('nope');
    }
  } else if (req.method === 'POST') {
    prisma.$connect();
    try {
      await prisma.post
        .create({
          data: {
            content: content,
            user_id,
            title,
            category_id,
          },
        })
        .then();
      res.status(200).json('New Post Successfully Created');
    } catch (e) {
      res.status(400).json('Creating post unsusccessful');
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
  prisma.$disconnect();
}
