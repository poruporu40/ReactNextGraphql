import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUserProfileQuery, useUpdateUserProfileMutation } from '@local/graphql';
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfilePage from './profile';
import { useRouter } from 'next/router';

// useUserProfileQueryとuseUpdateUserProfileMutationフックをモック
jest.mock('@local/graphql', () => ({
  useUserProfileQuery: jest.fn(),
  useUpdateUserProfileMutation: jest.fn(),
}));

// useUserフックをモック
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}));

// useRouterフックをモック
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ fileName: 'mocked-avatar.png' }),
      headers: new Headers(),
      redirected: false,
      statusText: 'OK',
      type: 'basic',
      url: '',
      clone: jest.fn(),
      body: null,
      bodyUsed: false,
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
      text: jest.fn(),
    })
  );
});

describe('ProfilePage Component', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      user: { name: 'Test User', email: 'test@example.com' },
      isLoading: false,
      error: null,
    });

    (useRouter as jest.Mock).mockReturnValue({
      route: '/settings/profile',
      pathname: '/settings/profile',
      query: '',
      asPath: '/settings/profile',
      push: jest.fn(),
    });

    (useUpdateUserProfileMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null }
    ]);
  });

  test('renders user profile information', () => {
    (useUserProfileQuery as jest.Mock).mockReturnValue({
      data: {
        user: {
          profile: 'Test Profile',
          location: 'Test Location',
          website: 'https://test.com',
          avatarPath: '/test-avatar.png',
        },
      },
      loading: false,
      error: null,
    });

    render(<ProfilePage />);

    expect(screen.getByDisplayValue('Test Profile')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Location')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://test.com')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('/test-avatar.png'));
  });

  test('shows loading state', () => {
    (useUserProfileQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ProfilePage />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  test('handles profile update', async () => {
    (useUserProfileQuery as jest.Mock).mockReturnValue({
      data: {
        user: {
          profile: 'Test Profile',
          location: 'Test Location',
          website: 'https://test.com',
          avatarPath: '/test-avatar.png',
        },
      },
      loading: false,
      error: null,
    });

    const mockUpdateUserProfile = jest.fn();
    (useUpdateUserProfileMutation as jest.Mock).mockReturnValue([mockUpdateUserProfile, { loading: false, error: null }]);

    render(<ProfilePage />);

    fireEvent.change(screen.getByLabelText('自己紹介'), { target: { value: 'Updated Profile' } });

    // ファイル選択をモック
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(screen.getByTestId('avatar-input'), { target: { files: [file] } });

    await act(async () => {
      fireEvent.click(screen.getByText('保存'));
    });

    expect(mockUpdateUserProfile).toHaveBeenCalledWith({
      variables: {
        profile: 'Updated Profile',
        location: 'Test Location',
        website: 'https://test.com',
        avatarPath: expect.any(String), // ファイル名が動的に生成されるため
      },
    });
  });
});
