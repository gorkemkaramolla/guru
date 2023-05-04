import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import NextAuth, { Account, Profile, SessionStrategy, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { Role } from '@/nextauth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',

      async authorize(credentials, req) {
        prisma.$connect();
        // check user existance
        // console.log(credentials);
        const result = await prisma.user.findFirst({
          where: { email: credentials?.email! },
        });
        // console.log(result);
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }

        const checkPassword = await compare(
          credentials?.password!,
          result?.password!
        );

        // incorrect password
        if (!checkPassword || result?.email !== credentials?.email!) {
          throw new Error("Username or Password doesn't match");
        }
        prisma.$disconnect();
        if (checkPassword) {
          return {
            id: String(result.id),
            email: result.email,
            name: result.name + ' ' + result.lastname,
          };
        } else return null;
      },
      credentials: { email: { type: 'text' }, password: { type: 'text' } },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | AdapterUser | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        if (user) {
          if (process.env.ADMINS?.split(',').includes(user?.email!))
            user.role = 'admin' as Role;
        }
        let newUser = await prisma.user.findUnique({
          where: { email: user?.email! },
        });
        if (!newUser) {
          newUser = await prisma.user.create({
            data: {
              email: user?.email!,
              name: user?.name?.split(' ')?.at(0)!,
              lastname: user?.name?.split(' ')?.at(1)!,
              profilePic: user?.image!,
              at: uuidv4(),
            },
          });
        }
        if (user) {
          user.at = newUser?.at;
          token.at = user.at;
        }
        token.userId = user?.id;
        token.accessToken = account.access_token;
      } else {
        const payload = {
          ...user,
          iat: Math.floor(Date.now() / 1000), // issued at time in seconds
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // expiration time in seconds, e.g. 12 hour from now
        };
        token.accessToken = sign(payload, process.env.JWT_SECRET!);
      }

      return token;
    },
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return baseUrl;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client, like an access_token from a provider.
      if (token && session?.user) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.user.at = token.at;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 3600000,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 3600000, // 60 secs
  },
  secret: process.env.NEXTAUTH_SECRET!,
});
