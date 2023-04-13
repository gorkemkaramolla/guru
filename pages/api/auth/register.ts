import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // db connect
    prisma.$connect();

    //   parse body
    const { name, lastname, email, password, role } = req.body.data;

    // check if user exists
    const isUserExists = await prisma.user.findFirst({
      where: { email: String(email)! },
    });
    if (isUserExists)
      return res.status(422).json({ message: 'User Already Exists...!' });

    // hash password and add to db

    await prisma.user
      .create({
        data: {
          name: name,
          lastname: lastname,
          email: email,
          password: await hash(password.trim(), 10),
          role: role,
          profilePic: '',
          at: name + lastname,
        },
      })
      .then((value) => res.status(201).json({ status: true, user: value }))
      .catch((reason) => res.status(404).json({ reason }));

    // disconnect db
    prisma.$disconnect();

    // send response
  }
  res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
}
