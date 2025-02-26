import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { useHelloQuery, useAuth0IdQuery } from '@local/graphql';
import Home from './index';

// モックデータ
jest.mock('@local/graphql', () => ({
  useHelloQuery: jest.fn(),
  useAuth0IdQuery: jest.fn(),
}));

describe('Home Component', () => {
  it('renders GraphQL responses', () => {
    // モックデータの設定
    (useHelloQuery as jest.Mock).mockReturnValue({
      data: { message: 'Hello, World!' },
    });
    (useAuth0IdQuery as jest.Mock).mockReturnValue({
      data: { id: 'auth0|123456789' },
    });

    // コンポーネントのレンダリング
    render(<Home />);

    // テキストの確認
    expect(screen.getByText('GraphQL Response')).toBeInTheDocument();
    expect(screen.getByText('Hello Query')).toBeInTheDocument();
    expect(screen.getByText('Auth0 ID Query')).toBeInTheDocument();

    // モックデータの確認
    expect(screen.getByText(/Hello, World!/)).toBeInTheDocument();
    expect(screen.getByText(/auth0\|123456789/)).toBeInTheDocument();
  });
}); 