import { Context } from '../types/index';
import { MiddlewareFunction } from '../types/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authMiddleware: MiddlewareFunction = async (
  resolve,
  parent,
  args,
  context: Context,
  info
) => {
  if (!context.auth0UserId) {
    throw new Error('Unauthorized');
  }

  // ユーザーを取得
  const user = await prisma.user.findUnique({
    where: { auth0UserId: context.auth0UserId },
  });

  // ユーザーまたは名前が存在しない場合にエラーをスロー
  if (!user || !user.name) {
    throw new Error('User not found or name is undefined');
  }

  // Context にユーザー情報を設定
  context.user = user;

  // 次のリゾルバを呼び出し
  return resolve(parent, args, context, info);
};
