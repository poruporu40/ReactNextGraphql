import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUser } from '@auth0/nextjs-auth0/client';
import Profile from './profile';
import { useRouter } from 'next/router';

// useUserフックをモック
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}));

// useRouterフックをモック
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Profile Page', () => {
  test('renders user information when authenticated', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { name: 'Test User', email: 'test@example.com', picture: '/test.png' },
      isLoading: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
      push: jest.fn(),
    });

    render(<Profile />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', '/test.png');
  });

  test('shows loading state', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
      push: jest.fn(),
    });

    render(<Profile />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});