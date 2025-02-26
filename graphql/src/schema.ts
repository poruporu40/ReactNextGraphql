import { Context } from './types/index';
import { GraphQLError } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import { authMiddleware, chainMiddleware } from './middlewares/index';

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    user: User!
    auth0Id: String!
    hello: String
    allUsers: [User!]!
    allPosts: [Post!]!
    postById(id: Int!): Post
    userExists(auth0UserId: String!): Boolean
  }

  type User {
    id: Int!
    auth0UserId: String!
    name: String!
    email: String!
    avatarPath: String
    auth0AvatarUrl: String
    posts: [Post!]!
    profile: String
    location: String
    website: String
  }

  type Post {
    id: Int!
    title: String!
    content: String
    published: Boolean!
    author: User
  }

  type Mutation {
    createUser(name: String!, email: String!, auth0UserId: String!, avatarUrl: String): User!
    updateUserProfile(profile: String!, location: String!, website: String!, avatarPath: String): User!
    createPost(title: String!, content: String!, author_id: Int): Post!
    updateUser(id: Int!, name: String, email: String): User!
    deleteUser(id: Int!): User!
    updatePost(id: Int!, title: String, content: String, published: Boolean): Post!
    deletePost(id: Int!): Post!
    registerUser(auth0UserId: String!, email: String!, name: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    user: async (_: unknown, __: unknown, context: Context): Promise<User> => {
      if (!context.user) {
        throw new GraphQLError('Unauthorized');
      }
      return context.user;
    },
    hello: () => 'Hello, world!',
    allUsers: async () => prisma.user.findMany(),
    allPosts: async () => prisma.post.findMany(),
    postById: async (_: unknown, args: { id: number }) =>
      prisma.post.findUnique({ where: { id: args.id } }),
    userExists: async (_: unknown, { auth0UserId }: { auth0UserId: string }) =>
      !!(await prisma.user.findUnique({
        where: { auth0UserId: auth0UserId },
      })),
    auth0Id: (_: unknown, __: unknown, context: Context) => {
      if (!context.auth0UserId) {
        throw new GraphQLError('Unauthorized');
      }
      return context.auth0UserId;
    },
  },
  Mutation: {
    createUser: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        auth0UserId: string;
        avatarUrl: string;
      }
    ) =>
      prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          auth0AvatarUrl: args.avatarUrl,
          auth0UserId: args.auth0UserId,
        },
      }),
    
    updateUserProfile: async (
      _: any,
      args: { profile?: string; location?: string; website?: string; avatarPath?: string },
      context: { user: { id: number } },
    ): Promise<User> => {
      try {
        const updatedUser = await prisma.user.update({
          where: { id: context.user.id },
          data: {
            profile: args.profile,
            location: args.location,
            website: args.website,
            avatarPath: args.avatarPath,
          },
        });

        return updatedUser;
      } catch (error) {
        console.error('Failed to update user profile:', error);
        throw new Error('プロフィールの更新に失敗しました');
      }
    },
    createPost: async (
      _: any,
      args: { title: string; content: string },
      context: { user: { id: number } } // authMiddlewareで取得済みのユーザー情報を利用
    ) => {
      return await prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          author_id: context.user.id, // context.userからIDを取得
        },
      });
    },
    updatePost: async (_: any, args: { id: number; title: string; content: string; published: boolean }) => {
      return await prisma.post.update({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
          published: args.published,
        },
      });
    },
    deletePost: async (_: any, args: { id: number }) => {
      return await prisma.post.delete({ where: { id: args.id } });
    },
  },
  User: {
    posts: async (parent: any) => {
      return await prisma.post.findMany({
        where: { author_id: parent.id },
      });
    },
  },
  Post: {
    author: async (parent: any) => {
      if (parent.author_id === null) {
        return null; // author_idがnullの場合、authorはnullを返す
      }
      return await prisma.user.findUnique({
        where: { id: parent.author_id },
      });
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const schemaWithMiddleware = applyMiddleware(schema, {
  Query: {
    user: chainMiddleware(authMiddleware),
  },
  Mutation: {
    createPost: chainMiddleware(authMiddleware),
    updateUserProfile: chainMiddleware(authMiddleware),
  },
});

export { schemaWithMiddleware as schema };
