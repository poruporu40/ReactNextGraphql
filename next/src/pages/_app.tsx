import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../lib/theme';
import { useState, useEffect } from 'react';
import { initializeApolloClient } from '../lib/apolloClient';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user } = pageProps;

  // クライアントサイドでのみ Apollo Client を初期化する
  const [apolloClient, setApolloClient] = useState(null);

  useEffect(() => {
    // クライアントサイドで Apollo Client を初期化
    const client = initializeApolloClient();
    setApolloClient(client);
  }, []);

  // Apollo Client がまだ初期化されていない場合は何も表示しない　各pageでapolloClientが生成されていない事を防ぐ
  if (!apolloClient) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <UserProvider user={user}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UserProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
