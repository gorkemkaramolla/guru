import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import slugify from 'slugify';

import { v4 as uuidv4 } from 'uuid';

function generateSlug(title: string): string {
  const slug = slugify(title, {
    lower: true,
    strict: true,
  });
  const uniqueId = uuidv4().substring(0, 8); // generate a unique identifier and take the first 8 characters
  return `${uniqueId}-${slug}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { content, title, user_id, category_id, description } = req.body;

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
    const slugAt = generateSlug(title);

    try {
      await prisma.post.create({
        data: {
          content: content,
          user_id: Number(user_id),
          title,
          category_id: Number(category_id),
          at: slugAt,
          description,
        },
      });
      res.status(200).json('New Post Successfully Created');
    } catch (e) {
      console.log(e);
      res.status(400).json('Creating post unsuccessful');
    } finally {
      prisma.$disconnect();
    }
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
