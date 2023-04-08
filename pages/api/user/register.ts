import type { NextApiRequest, NextApiResponse } from 'next';

import User from '../../../model/user.model';
import { ObjectId } from 'mongodb';
import prisma from '@/lib/prisma';
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    const users = await User.find({});
    res.status(201).json(users);
  } else if (req.method === 'POST') {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
    });
    res.status(200).json({ response: user.email });
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
