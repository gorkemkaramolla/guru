import prisma from '@/lib/prisma';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';
import { GraphQLScalarType, Kind } from 'graphql';
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value);
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});
const resolvers = {
  Date: dateScalar,
  Query: {
    getUser: async (_parent: any, { at }: any, { req, res, session }: any) => {
      prisma.$connect();

      const user = await prisma.user.findFirst({
        where: {
          at: at,
        },
      });
      prisma.$disconnect();

      return user;
    },
    getUsers: async (_parent: any, _args: any, context: any) => {
      prisma.$connect();
      const users = await prisma.user.findMany();
      prisma.$disconnect();
      return users;
    },
    getPosts: async (_parent: any, _args: any, context: any) => {
      prisma.$connect();
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              name: true,
              lastname: true,
              profilePic: true,
              at: true,
            },
          },
        },
      });
      prisma.$disconnect();
      return posts;
    },
  },

  // Mutation: {
  //   updateUserName: async (
  //     _parent: any,
  //     { at, name }: any,
  //     { req, res, session }: any
  //   ) => {
  //     const updatedUser = await prisma.user.update({
  //       where: { at: at },
  //       data: { name: name },
  //     });
  //     return updatedUser;
  //   },
  //   updateUserLastname: async (
  //     _parent: any,
  //     { at, lastname }: any,
  //     context: any
  //   ) => {
  //     const updatedUser = await prisma.user.update({
  //       where: { at: at },
  //       data: { lastname: lastname },
  //     });
  //     return updatedUser;
  //   },
  // },
};

// ...

const typeDefs = gql`
  type Query {
    getUsers: [User]
    getUser(at: String!): User
    getPosts: [Post]
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
  scalar Date
  type Post {
    at: String
    category_id: Int
    title: String
    content: String
    created_at: Date
    updated_at: Date
    user_id: Int
    description: String
    user: User
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {});
