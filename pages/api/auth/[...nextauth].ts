// import { Role } from '@/nextauth';
import NextAuth, { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
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
        token.accessToken = account.access_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return baseUrl;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // Send properties to the client, like an access_token from a provider.
      if (token && session.user) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
