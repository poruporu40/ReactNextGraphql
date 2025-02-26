import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// クッキーから `idToken` を取得する関数
const getIdTokenFromCookie = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )idToken=([^;]+)'));
  return match ? match[2] : null;
};

// `idToken` をクッキーから取得して Apollo Client を作成
export const createApolloClient = () => {
  const idToken = getIdTokenFromCookie();

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql', // GraphQL サーバーの URL
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: idToken ? `Bearer ${idToken}` : '',
    },
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

// 初期化関数
export const initializeApolloClient = () => {
  return createApolloClient();
};
