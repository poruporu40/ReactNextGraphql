import React, { useState } from 'react';
import withAuth from '../lib/withAuth';
import { Tabs, Tab, Box, Typography, Container, Avatar } from '@mui/material';

interface Post {
  id: number;
  content: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  posts: Post[];
  likes: Post[];
}

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  avatarUrl: '/avatar.png',
  posts: [
    { id: 1, content: '初めての投稿です！', createdAt: '2024-11-01' },
    { id: 2, content: '今日の天気は晴れです。', createdAt: '2024-11-02' },
  ],
  likes: [
    { id: 3, content: 'この投稿すごい！', createdAt: '2024-11-03' },
    { id: 4, content: '役に立ちました、ありがとう！', createdAt: '2024-11-04' },
  ],
};

const UserIdPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" mt={4} mb={2}>
        <Avatar
          alt={mockUser.name}
          src={mockUser.avatarUrl}
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Typography variant="h5">{mockUser.name}</Typography>
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <Tab label="投稿" />
        <Tab label="いいね" />
      </Tabs>
      <Box mt={3}>
        {tabIndex === 0 && (
          <Box>
            {mockUser.posts.length > 0 ? (
              mockUser.posts.map((post) => (
                <Box
                  key={post.id}
                  mb={2}
                  p={2}
                  border={1}
                  borderRadius={4}
                  borderColor="grey.300"
                >
                  <Typography variant="body1">{post.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {post.createdAt}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                投稿がありません。
              </Typography>
            )}
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            {mockUser.likes.length > 0 ? (
              mockUser.likes.map((like) => (
                <Box
                  key={like.id}
                  mb={2}
                  p={2}
                  border={1}
                  borderRadius={4}
                  borderColor="grey.300"
                >
                  <Typography variant="body1">{like.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {like.createdAt}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                いいねした投稿がありません。
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default withAuth(UserIdPage);
