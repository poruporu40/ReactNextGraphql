import { graphql } from 'graphql';
import { schema } from '../schema'; // スキーマのインポート

describe('GraphQL Schema', () => {
  it('should return hello message', async () => {
    const query = `
      query {
        hello
      }
    `;

    const result = await graphql({
      schema,
      source: query,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      hello: 'Hello, world!',
    });
  });
}); 