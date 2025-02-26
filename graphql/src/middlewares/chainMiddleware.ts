import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/index'; // 統一した Context 型を使用

export type MiddlewareFunction = (
  resolve: (
    parent: unknown,
    args: Record<string, unknown>,
    context: Context, // 統一された型
    info: GraphQLResolveInfo
  ) => Promise<unknown>,
  parent: unknown,
  args: Record<string, unknown>,
  context: Context, // 統一された型
  info: GraphQLResolveInfo
) => Promise<unknown>;

export const chainMiddleware = (...middlewares: MiddlewareFunction[]) => {
  return async (
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
  ) => {
    let next = resolve;
    for (const middleware of middlewares.reverse()) {
      const currentNext = next;
      next = (parent, args, context, info) =>
        middleware(currentNext, parent, args, context, info);
    }
    return await next(parent, args, context, info);
  };
};
