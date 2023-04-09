import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { Account, Profile, User } from 'next-auth';
import { Adapter, AdapterUser } from 'next-auth/adapters';

import { JWT } from 'next-auth/jwt';
const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        // if (user) {
        //   if (process.env.ADMINS?.split(',').includes(user?.email!))
        //     user.role = 'admin' as Role;
        //   token.role = user.role;
        // }
        let user2 = await prisma.user.findUnique({
          where: { email: user?.email! },
        });
        if (!user2) {
          user2 = await prisma.user.create({
            data: {
              email: user?.email!,
              name: user?.name?.split(' ')?.at(0)!,
              lastname: user?.name?.split(' ')?.at(1)!,
              profilePic: user?.image!,
            },
          });
        }
        token.userId = user?.id;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return baseUrl;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client, like an access_token from a provider.
      if (token && session.user) {
        // session.user.role = token.role;

        // const newUser = await new userModel({
        //   _id: new ObjectId(),
        //   email: session.user?.email,
        //   name: session.user?.name,
        //   image: session.user?.image,
        // });
        // await newUser.save();
        // console.log('user: ' + user);

        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
