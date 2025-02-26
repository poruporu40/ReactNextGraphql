'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import withAuth from '../lib/withAuth';
import axios from 'axios';
import { useEffect } from 'react';

const Profile = () => {
  const { user, isLoading, error } = useUser();

  console.log('Error:', error); // デバッグ用にエラーを出力

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>; // エラーメッセージを表示

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.picture} alt={user.name} />
    </div>
  );
};

export default withAuth(Profile);
