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
  updatedUser?: {
    name: string;
    email: string;
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
    res.status(200).json({ data: 'hello' });
  } else if (req.method === 'PUT') {
    try {
      prisma.$connect();

      const { at, email, name, lastname } = req.body;

      if (!at || !email || !name || !lastname) {
        res.status(400).json({ data: 'missing fields' });
        return;
      }
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        res.status(401).json({ data: 'unauthorized' });
        return;
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(token.userId as string),
        },
        data: {
          at: at,
          email: email,
          name: name,
          lastname: lastname,
        },
      });
      prisma.$disconnect();
      if (updatedUser) {
        res.status(200).json({
          data: 'User Informations successfully updated',
          updatedUser: {
            name: updatedUser.name + ' ' + updatedUser.lastname,
            at: updatedUser.at,
            email: updatedUser.email,
          },
        });
        return;
      } else {
        res.status(402).json({ data: 'unsuccess' });
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: 'internal server error' });
    } finally {
      prisma.$disconnect();
    }
  }
}
