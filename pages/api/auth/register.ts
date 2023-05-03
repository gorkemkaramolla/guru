import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    prisma.$connect();

    const { name, lastname, email, password, role } = req.body.data;

    const isUserExists = await prisma.user.findFirst({
      where: { email: String(email)! },
    });
    if (isUserExists)
      return res.status(422).json({ message: 'User Already Exists...!' });

    await prisma.user
      .create({
        data: {
          name: name,
          lastname: lastname,
          email: email,
          password: await hash(password.trim(), 10),
          role: role,
          profilePic: '',
          at: uuidv4(),
        },
      })
      .then((value) => res.status(201).json({ status: true, user: value }))
      .catch((reason) => res.status(404).json({ reason }));

    prisma.$disconnect();
  }
  res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
}
