import { useHelloQuery, useAuth0IdQuery } from '@local/graphql';

const Home = () => {
  const { data: helloData } = useHelloQuery();
  const { data: auth0IdData } = useAuth0IdQuery();

  return (
    <div>
      <h1>GraphQL Response</h1>
      <h2>Hello Query</h2>
      <pre>{JSON.stringify(helloData, null, 2)}</pre>

      <h2>Auth0 ID Query</h2>
      <pre>{JSON.stringify(auth0IdData, null, 2)}</pre>
    </div>
  );
};

export default Home;
