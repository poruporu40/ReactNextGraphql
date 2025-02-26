import {
  handleAuth,
  handleLogin,
  handleLogout,
  handleCallback,
} from '@auth0/nextjs-auth0';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import cookie from 'cookie';

// GraphQL クライアントの初期化
const client = new ApolloClient({
  uri: 'http://graphql-server:4000/graphql', // GraphQL サーバーの URL
  cache: new InMemoryCache(),
});

// ユーザーがすでに登録されているか確認するクエリ
const CHECK_USER_EXISTS = gql`
  query CheckUserExists($auth0UserId: String!) {
    userExists(auth0UserId: $auth0UserId)
  }
`;

// ユーザーを登録するミューテーション
const REGISTER_USER_MUTATION = gql`
  mutation CreateUser(
    $auth0UserId: String!
    $email: String!
    $name: String!
    $avatarUrl: String
  ) {
    createUser(
      auth0UserId: $auth0UserId
      email: $email
      name: $name
      avatarUrl: $avatarUrl
    ) {
      id
      email
      name
      auth0AvatarUrl
    }
  }
`;

export default handleAuth({
  async login(req, res) {
    const returnTo = req.query.returnTo || '/';
    await handleLogin(req, res, {
      returnTo: returnTo.toString(),
    });
  },

  async logout(req, res) {
    try {
      // クッキーのidTokenを削除
      res.setHeader(
        'Set-Cookie',
        'idToken=; Path=/; Max-Age=0; SameSite=Strict'
      );
      await handleLogout(req, res, {
        returnTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
      });
    } catch (error) {
      console.error('logoutエラー', error);
      res.status(error.status || 500).end(error.message);
    }
  },

  async callback(req, res) {
    try {
      console.log('callbackまできてる');

      // handleCallbackを使って認証後の処理
      await handleCallback(req, res, {
        async afterCallback(req, res, session) {
          // 認証後のセッションを取得
          if (!session || !session.user) {
            throw new Error('No session or user found');
          }

          const { user } = session;
          const auth0UserId = user.sub; // Auth0 のユーザーID
          const avatarUrl = user.picture;
          const userEmail = user.email; // ユーザーのメールアドレス
          const userName = user.name;
          console.log('ユーザーテーブルをチェック', user);

          // ユーザーがすでに登録されているかを確認
          const { data } = await client.query({
            query: CHECK_USER_EXISTS,
            variables: { auth0UserId },
          });

          console.log('ユーザーテーブルのデータ', data);

          if (!data.userExists) {
            console.log('ユーザテーブルにデータが存在しない');
            // ユーザーが未登録の場合、GraphQL ミューテーションを実行してユーザーを登録
            await client.mutate({
              mutation: REGISTER_USER_MUTATION,
              variables: {
                auth0UserId,
                avatarUrl,
                email: userEmail,
                name: userName,
              },
            });
            console.log('New user registered:', userEmail);
          } else {
            console.log('User already exists:', userEmail);
          }

          // idTokenをクッキーに保存
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('idToken', session.idToken, {
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production', // 本番環境ではsecureをtrueにする
              maxAge: 60 * 60 * 24 * 7, // 1週間
              path: '/',
            })
          );
          return session; // セッションを返す
        },
      });
    } catch (error) {
      console.log('callbackエラー', error);
      res.status(error.status || 500).end(error.message);
    }
  },
});
