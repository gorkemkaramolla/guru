import prisma from '@/lib/prisma';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
const resolvers = {
  Query: {
    getUser: async (_parent: any, { at }: any) => {
      const user = await prisma.user.findFirst({
        where: {
          at: at,
        },
      });
      console.log(user);
      return user;
    },
    getUsers: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
  },
};

const typeDefs = gql`
  type Query {
    getUsers: [User]
    getUser(at: String!): User
  }

  type User {
    name: String
    email: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
