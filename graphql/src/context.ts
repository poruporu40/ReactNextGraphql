import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Context } from './types/index';

// Prisma Clientの初期化
const prisma = new PrismaClient();

// JWTトークンのカスタム型
interface DecodedToken {
  sub?: string; // ユーザーIDが入るフィールド
  [key: string]: unknown; // その他のフィールドを許容
}

// コンテキスト作成関数
export const createContext = async (args: {
  request?: IncomingMessage;
}): Promise<Context> => {
  const auth0UserId = await extractUserIdFromRequest(args.request);

  // 存在する値のみを動的に追加
  return {
    prisma,
    ...(auth0UserId && { auth0UserId }),
  };
};

// JWTトークンからユーザーIDを取得する関数
const getAuth0UserId = async (token: string): Promise<string | undefined> => {
  try {
    const decodedToken = jwt.decode(token) as DecodedToken;
    if (!decodedToken) {
      throw new Error('Invalid token');
    }
    return decodedToken.sub;
  } catch (error) {
    console.error('Error decoding token:', error);
    return undefined;
  }
};

// AuthorizationヘッダーからトークンとユーザーIDを取得する関数
const extractUserIdFromRequest = async (
  request?: IncomingMessage
): Promise<string | undefined> => {
  const authHeader = request?.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  return token ? await getAuth0UserId(token) : undefined;
};
