import prisma from '@/lib/prisma';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { authMiddleware } from '../../util/middleware';

const resolvers = {
  Query: {
    getUser: authMiddleware(async (_parent: any, { at }: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          at: at,
        },
      });
      console.log(user);
      return user;
    }),
    getUsers: authMiddleware(async (_parent: any, _args: any, context: any) => {
      const users = await prisma.user.findMany();
      return users;
    }),
  },
  Mutation: {
    updateUserName: authMiddleware(
      async (_parent: any, { at, name }: any, context: any) => {
        const updatedUser = await prisma.user.update({
          where: { at: at },
          data: { name: name },
        });
        return updatedUser;
      }
    ),
    updateUserLastname: authMiddleware(
      async (_parent: any, { at, lastname }: any, context: any) => {
        const updatedUser = await prisma.user.update({
          where: { at: at },
          data: { lastname: lastname },
        });
        return updatedUser;
      }
    ),
  },
};

// ...

const typeDefs = gql`
  type Query {
    getUsers: [User]
    getUser(at: String!): User
  }
  type Mutation {
    updateUserName(at: String!, name: String!): User
    updateUserLastname(at: String!, lastname: String!): User
  }
  type User {
    name: String
    lastname: String
    email: String
    profilePic: String
    at: String
    register_date: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
