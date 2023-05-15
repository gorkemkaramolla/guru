import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { decode, verify } from 'jsonwebtoken';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';

type Data = {
  data: string;
  userData?: {
    name: string;
    email: string;
    lastname: string;
    at: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req) {
    // getSession function was called on the client-side, return an error response
    return res.status(400).json({ data: 'Invalid request' });
  }
  if (req.method === 'GET') {
    prisma.$connect();

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      res.status(401).json({ data: 'unauthorized' });
      return;
    }
    const userResponse = await prisma.user.findFirst({
      where: {
        id: parseInt(token.userId as string),
      },
    });
    if (userResponse) {
      res.status(200).json({
        data: 'success',
        userData: {
          name: userResponse.name,
          at: userResponse.at,
          email: userResponse.email,
          lastname: userResponse.lastname,
        },
      });
      return;
    } else {
      res.status(404).json({ data: 'not found' });
      return;
    }
  } else if (req.method === 'PUT') {
  }
}
