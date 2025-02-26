import { GraphQLResolveInfo } from 'graphql';
import { PrismaClient, User } from '@prisma/client';

export interface Context {
  auth0UserId?: string; // Auth0 のユーザーID
  prisma: PrismaClient; // Prisma クライアント
  user?: User;
  [key: string]: unknown; // 動的プロパティを許容
}

export type MiddlewareFunction = (
  resolve: (
    parent: unknown,
    args: Record<string, unknown>,
    context: Context,
    info: GraphQLResolveInfo
  ) => Promise<unknown>,
  parent: unknown,
  args: Record<string, unknown>,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<unknown>;
