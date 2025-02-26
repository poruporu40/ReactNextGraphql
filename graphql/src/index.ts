import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema';
import { createContext } from './context';

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => createContext({ request: req }),
  listen: { port: 4000 },
});

console.log(`Server is running on ${url}`);
